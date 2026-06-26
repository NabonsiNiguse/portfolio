"""
DRF serializers for the portfolio API.

Single source of truth for the JSON contract between Django and React.
Every field name here must match what the frontend TypeScript interfaces consume.
"""

from rest_framework import serializers
from .models import (
    Certification,
    ContactInquiry,
    Experience,
    Profile,
    Project,
    Skill,
    SkillGroup,
)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def absolute_image_url(request, field) -> str | None:
    """
    Return an absolute URL for a Django ImageField/FileField value.

    - If the field has no file, returns None.
    - If a request is available in serializer context, uses build_absolute_uri
      so the URL works correctly in both dev and production.
    - Falls back to the relative path when request is absent (e.g. shell tests).
    """
    if not field:
        return None
    if request:
        return request.build_absolute_uri(field.url)
    return field.url


# ---------------------------------------------------------------------------
# Profile
# ---------------------------------------------------------------------------

class ProfileSerializer(serializers.ModelSerializer):
    """
    Produces:
      {
        "id": 1,
        "name": "Nabonsi Niguse",
        "title": "Full-Stack Software Engineer",
        "bio_paragraphs": "paragraph one\\nparagraph two",
        "avatar": "http://127.0.0.1:8000/media/profile/photo.jpg" | null,
        "is_available": true
      }

    Bug 1 fix: avatar is a SerializerMethodField that returns an absolute URL
    via request.build_absolute_uri so it works in both dev and production.
    The default ImageField would only return a relative path like /media/...
    which breaks on any domain other than the one Vite is proxying.
    """

    # Bug 1 fix: override the default ImageField with a method field
    # that returns a fully-qualified URL rather than a relative path.
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ["id", "name", "title", "bio_paragraphs", "avatar", "is_available"]

    def get_avatar(self, obj: Profile) -> str | None:
        return absolute_image_url(self.context.get("request"), obj.avatar)


# ---------------------------------------------------------------------------
# Skills
# ---------------------------------------------------------------------------

class SkillInlineSerializer(serializers.ModelSerializer):
    """Single skill tag — { id, name } — used inside SkillGroupSerializer."""

    class Meta:
        model = Skill
        fields = ["id", "name"]


class SkillGroupSerializer(serializers.ModelSerializer):
    """
    Produces:
      {
        "id": 1,
        "label": "Backend",           ← category (display value)
        "icon_name": "Code2",
        "tags": ["Python", "Django"], ← flat string array
        "skills": [                   ← object array for dynamic rendering
          { "id": 1, "name": "Python" },
          { "id": 2, "name": "Django" }
        ]
      }
    """

    label  = serializers.CharField(source="category")
    tags   = serializers.SerializerMethodField()
    skills = SkillInlineSerializer(many=True, read_only=True)

    class Meta:
        model = SkillGroup
        fields = ["id", "label", "icon_name", "tags", "skills"]

    def get_tags(self, obj: SkillGroup) -> list[str]:
        return list(
            obj.skills.order_by("order", "name").values_list("name", flat=True)
        )


# ---------------------------------------------------------------------------
# Projects
# ---------------------------------------------------------------------------

class ProjectSerializer(serializers.ModelSerializer):
    """
    Produces:
      {
        "id": 1,
        "title": "E-Learning Platform",
        "summary": "...",
        "stack": ["Django", "React", ...],
        "highlights": ["...", "..."],
        "githubUrl": "https://..." | null,
        "demoUrl":   "https://..." | null,
        "image":     "http://host/media/projects/x.png" | null
      }

    image uses absolute_image_url for the same reason as Profile.avatar —
    the default ImageField serialization returns a relative path.
    """

    stack      = serializers.SerializerMethodField()
    highlights = serializers.SerializerMethodField()
    githubUrl  = serializers.URLField(source="github_link", allow_null=True)
    demoUrl    = serializers.URLField(source="live_link",   allow_null=True)
    # Bug 1 (same root cause): absolute URL for project screenshot
    image      = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "summary",
            "stack",
            "highlights",
            "githubUrl",
            "demoUrl",
            "image",
        ]

    def get_stack(self, obj: Project) -> list[str]:
        """Comma-separated tags → clean string array."""
        return [tag.strip() for tag in obj.tags.split(",") if tag.strip()]

    def get_highlights(self, obj: Project) -> list[str]:
        """Newline-separated bullet points → clean string array."""
        return [line.strip() for line in obj.bullet_points.splitlines() if line.strip()]

    def get_image(self, obj: Project) -> str | None:
        return absolute_image_url(self.context.get("request"), obj.image)


# ---------------------------------------------------------------------------
# Certifications
# ---------------------------------------------------------------------------

class CertificationSerializer(serializers.ModelSerializer):
    """
    Produces:
      {
        "id": 1,
        "issuer": "WabiSkills",
        "credential": "Certified Full-Stack Developer — Django & React",
        "year": "2024",
        "verifyUrl": null,
        "description": "...",
        "badge": "http://host/media/certifications/badge.png" | null
      }

    badge uses absolute_image_url for the same reason as avatar/image.
    """

    credential = serializers.CharField(source="title")
    verifyUrl  = serializers.URLField(source="verify_link", allow_null=True)
    # Bug 1 (same root cause): absolute URL for certification badge
    badge      = serializers.SerializerMethodField()

    class Meta:
        model = Certification
        fields = ["id", "issuer", "credential", "year", "verifyUrl", "description", "badge"]

    def get_badge(self, obj: Certification) -> str | None:
        return absolute_image_url(self.context.get("request"), obj.badge)


# ---------------------------------------------------------------------------
# Experience / Timeline
# ---------------------------------------------------------------------------

class ExperienceSerializer(serializers.ModelSerializer):
    """
    Produces:
      {
        "id": 1,
        "year": "2024",
        "title": "WabiSkills Certification",
        "company": "WabiSkills",
        "description": "..."
      }
    """

    title = serializers.CharField(source="role")

    class Meta:
        model = Experience
        fields = ["id", "year", "title", "company", "description"]


# ---------------------------------------------------------------------------
# Contact Inquiry — POST only
# ---------------------------------------------------------------------------

class ContactInquirySerializer(serializers.ModelSerializer):
    """
    Accepts:  { name, email, message }
    Returns:  { id, name, email, message, created_at }
    """

    class Meta:
        model = ContactInquiry
        fields = ["id", "name", "email", "message", "created_at"]
        read_only_fields = ["id", "created_at"]
