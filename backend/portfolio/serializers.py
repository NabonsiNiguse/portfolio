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
# Profile
# ---------------------------------------------------------------------------

class ProfileSerializer(serializers.ModelSerializer):
    """
    Produces:
      {
        "id": 1,
        "name": "Nabonsi Niguse",
        "title": "Full-Stack Software Engineer",
        "bio_paragraphs": "paragraph one\nparagraph two",
        "avatar": "http://127.0.0.1:8000/media/profile/photo.jpg" | null,
        "is_available": true
      }

    avatar is serialized as an absolute URL so the frontend <img> tag works
    regardless of the deployment domain — no path-joining needed on the client.
    """

    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ["id", "name", "title", "bio_paragraphs", "avatar", "is_available"]

    def get_avatar(self, obj: Profile) -> str | None:
        if not obj.avatar:
            return None
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.avatar.url)
        # Fallback: return the relative path (works when proxied by Vite)
        return obj.avatar.url


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
        "tags": ["Python", "Django"], ← flat string array (for static fallback)
        "skills": [                   ← object array (for dynamic rendering)
          { "id": 1, "name": "Python" },
          { "id": 2, "name": "Django" }
        ]
      }

    Both `tags` (flat array) and `skills` (object array) are provided so the
    frontend can use whichever shape it needs without a second request.
    """

    # "label" is the camelCase alias the frontend uses (maps to model "category")
    label = serializers.CharField(source="category")
    # Flat string array — convenient for display, e.g. badge text
    tags = serializers.SerializerMethodField()
    # Object array with id — needed when the frontend renders dynamic icons or keys
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
        "stack": ["Django", "React", ...],   ← parsed from comma-separated tags
        "highlights": ["...", "..."],         ← parsed from newline-separated bullet_points
        "githubUrl": "https://..." | null,   ← camelCase alias for github_link
        "demoUrl": "https://..." | null,     ← camelCase alias for live_link
        "image": "/media/projects/x.png" | null
      }
    """

    # SerializerMethodFields parse stored text into clean arrays
    stack = serializers.SerializerMethodField()
    highlights = serializers.SerializerMethodField()

    # camelCase aliases — match the frontend Project interface exactly
    githubUrl = serializers.URLField(source="github_link", allow_null=True)
    demoUrl = serializers.URLField(source="live_link", allow_null=True)

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
        return [
            line.strip() for line in obj.bullet_points.splitlines() if line.strip()
        ]


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
        "badge": "/media/certifications/badge.png" | null
      }
    """

    # "credential" is the frontend key; maps to the model's "title" field
    credential = serializers.CharField(source="title")
    # "verifyUrl" camelCase alias for verify_link
    verifyUrl = serializers.URLField(source="verify_link", allow_null=True)

    class Meta:
        model = Certification
        fields = ["id", "issuer", "credential", "year", "verifyUrl", "description", "badge"]


# ---------------------------------------------------------------------------
# Experience / Timeline
# ---------------------------------------------------------------------------

class ExperienceSerializer(serializers.ModelSerializer):
    """
    Produces:
      {
        "id": 1,
        "year": "2024",
        "title": "WabiSkills Certification",   ← alias for model field "role"
        "company": "WabiSkills",
        "description": "..."
      }

    The frontend TimelineEntry interface uses { year, title, description }.
    "title" is aliased from the model's "role" field so no frontend mapping needed.
    """

    # "title" in the frontend maps to "role" in the model
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
