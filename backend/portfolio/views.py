"""
Portfolio API views.

Public read-only viewsets for all portfolio data.
Rate-limited POST-only endpoint for contact form submissions.
"""

import logging

from rest_framework import mixins, status, viewsets
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .models import (
    Certification,
    ContactInquiry,
    Experience,
    Profile,
    Project,
    SkillGroup,
)
from .serializers import (
    CertificationSerializer,
    ContactInquirySerializer,
    ExperienceSerializer,
    ProfileSerializer,
    ProjectSerializer,
    SkillGroupSerializer,
)

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Custom throttle — 5 contact submissions per IP per day
# ---------------------------------------------------------------------------

class ContactRateThrottle(AnonRateThrottle):
    """
    Strict 5/day limit isolated in the "contact" cache bucket so it doesn't
    consume the general "anon" 200/day quota on read endpoints.
    """

    scope = "contact"


# ---------------------------------------------------------------------------
# Public read-only viewsets
# ---------------------------------------------------------------------------

class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/profile/      → list (returns the single profile record)
    GET /api/profile/{id}/ → single profile

    Only one profile record should exist. The frontend reads index 0.
    """

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class SkillGroupViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/skills/       → all skill groups with tags + skills objects
    GET /api/skills/{id}/  → single group
    """

    queryset = SkillGroup.objects.prefetch_related("skills").order_by("order", "category")
    serializer_class = SkillGroupSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/projects/       → all projects ordered by `order`
    GET /api/projects/{id}/  → single project
    """

    queryset = Project.objects.all().order_by("order", "title")
    serializer_class = ProjectSerializer


class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/certifications/       → all certifications
    GET /api/certifications/{id}/  → single certification
    """

    queryset = Certification.objects.all().order_by("order", "year")
    serializer_class = CertificationSerializer


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/experience/       → all timeline entries ordered by `order`
    GET /api/experience/{id}/  → single entry
    """

    queryset = Experience.objects.all().order_by("order", "year")
    serializer_class = ExperienceSerializer


# ---------------------------------------------------------------------------
# Contact form — POST only, rate-limited
# ---------------------------------------------------------------------------

class ContactInquiryViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    POST /api/contact/

    Accepts { name, email, message }, validates, and persists.
    Throttled to 5 requests per IP per day.
    Degrades gracefully — never raises an unhandled 500.
    """

    serializer_class = ContactInquirySerializer
    throttle_classes = [ContactRateThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {"success": False, "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            inquiry = serializer.save()
            logger.info(
                "Contact inquiry received from %s <%s> (id=%d)",
                inquiry.name,
                inquiry.email,
                inquiry.pk,
            )
        except Exception as exc:
            logger.exception("Failed to save ContactInquiry: %s", exc)
            return Response(
                {
                    "success": False,
                    "message": (
                        "Your message could not be saved right now. "
                        "Please try again or email directly."
                    ),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {
                "success": True,
                "message": "Thanks for reaching out! I'll get back to you soon.",
                "id": inquiry.pk,
            },
            status=status.HTTP_201_CREATED,
        )
