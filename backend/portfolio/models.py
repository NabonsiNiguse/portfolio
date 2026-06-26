"""
Portfolio data models.

Field naming mirrors the React frontend's data contracts exactly so that
serializers can produce zero-transform JSON responses.
"""

from django.db import models
from django.core.validators import MaxLengthValidator


# ---------------------------------------------------------------------------
# Skills
# ---------------------------------------------------------------------------

class SkillGroup(models.Model):
    """
    Represents one skill card on the Skills section (e.g. "Backend").
    Maps to the frontend Skill interface: { label, icon, tags }.
    """

    class Category(models.TextChoices):
        BACKEND = "Backend", "Backend"
        FRONTEND = "Frontend", "Frontend"
        DATABASE = "Database", "Database"
        CORE_NETWORKING = "Core & Networking", "Core & Networking"

    category = models.CharField(
        max_length=30,
        choices=Category.choices,
        unique=True,
        help_text="The skill group label shown on the frontend card.",
    )
    icon_name = models.CharField(
        max_length=60,
        help_text=(
            "Lucide icon component name (e.g. 'Code2', 'Globe', 'Database', 'Network'). "
            "Must match an exported name from lucide-react."
        ),
    )
    order = models.IntegerField(
        default=0,
        help_text="Display order — lower numbers appear first.",
    )

    class Meta:
        ordering = ["order", "category"]
        verbose_name = "Skill Group"
        verbose_name_plural = "Skill Groups"

    def __str__(self) -> str:
        return self.category


class Skill(models.Model):
    """
    A single skill tag within a SkillGroup.
    Maps to the `tags` array on the frontend.
    """

    group = models.ForeignKey(
        SkillGroup,
        on_delete=models.CASCADE,
        related_name="skills",
    )
    name = models.CharField(
        max_length=100,
        help_text="Skill label exactly as it should appear on the badge (e.g. 'Django REST Framework').",
    )
    order = models.IntegerField(
        default=0,
        help_text="Display order within this group — lower numbers appear first.",
    )

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self) -> str:
        return f"{self.group.category} › {self.name}"


# ---------------------------------------------------------------------------
# Projects
# ---------------------------------------------------------------------------

class Project(models.Model):
    """
    A portfolio project card.
    Maps to the frontend Project interface:
      { title, summary, stack[], highlights[], githubUrl, demoUrl }
    """

    title = models.CharField(max_length=200)
    summary = models.TextField(
        help_text="One punchy sentence describing what the project does and why.",
    )
    tags = models.CharField(
        max_length=500,
        help_text=(
            "Comma-separated tech stack tags shown on the card "
            "(e.g. 'Django, React, PostgreSQL, Tailwind CSS'). "
            "Serialized as a JSON array by the API."
        ),
    )
    bullet_points = models.TextField(
        help_text=(
            "One feature highlight per line. "
            "Each line becomes one bullet in the highlights array. "
            "Example:\n  Role-based access: instructor, student, and admin dashboards\n  JWT authentication with token refresh flow"
        ),
    )
    github_link = models.URLField(
        blank=True,
        null=True,
        verbose_name="GitHub URL",
        help_text="Link to the GitHub repository. Leave blank if private.",
    )
    live_link = models.URLField(
        blank=True,
        null=True,
        verbose_name="Live Demo URL",
        help_text="Link to the deployed demo. Leave blank if not available.",
    )
    image = models.ImageField(
        upload_to="projects/",
        blank=True,
        null=True,
        help_text="Optional project screenshot (PNG or JPG, 16:9 recommended).",
    )
    order = models.IntegerField(
        default=0,
        help_text="Display order — lower numbers appear first (leftmost card).",
    )

    class Meta:
        ordering = ["order", "title"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self) -> str:
        return self.title


# ---------------------------------------------------------------------------
# Certifications
# ---------------------------------------------------------------------------

class Certification(models.Model):
    """
    A certification credential card.
    Maps to the frontend Certification interface:
      { issuer, credential, year, verifyUrl, description }
    """

    title = models.CharField(
        max_length=300,
        verbose_name="Credential Title",
        help_text="Full credential name (e.g. 'Certified Full-Stack Developer — Django & React').",
    )
    issuer = models.CharField(
        max_length=200,
        help_text="Issuing organisation (e.g. 'WabiSkills').",
    )
    year = models.CharField(
        max_length=4,
        validators=[MaxLengthValidator(4)],
        help_text="Four-digit year of issue (e.g. '2024').",
    )
    description = models.TextField(
        help_text="One or two sentences describing what this credential validates.",
    )
    verify_link = models.URLField(
        blank=True,
        null=True,
        verbose_name="Verify URL",
        help_text="Link to the issuer's credential verification page. Leave blank if not available.",
    )
    badge = models.ImageField(
        upload_to="certifications/",
        blank=True,
        null=True,
        help_text="Optional certification badge image (PNG with transparent background recommended).",
    )
    order = models.IntegerField(
        default=0,
        help_text="Display order — lower numbers appear first.",
    )

    class Meta:
        ordering = ["order", "year"]
        verbose_name = "Certification"
        verbose_name_plural = "Certifications"

    def __str__(self) -> str:
        return f"{self.issuer} — {self.title}"


# ---------------------------------------------------------------------------
# Experience / Timeline
# ---------------------------------------------------------------------------

class Experience(models.Model):
    """
    A timeline entry on the Experience & Growth section.
    Maps to the frontend TimelineEntry interface:
      { year, title, description }
    """

    year = models.CharField(
        max_length=30,
        help_text="Year label as displayed (e.g. '2024 - Present' or 'Now').",
    )
    role = models.CharField(
        max_length=200,
        verbose_name="Title / Role",
        help_text="Short title for this milestone (e.g. 'WabiSkills Certification').",
    )
    company = models.CharField(
        max_length=200,
        verbose_name="Organisation / Context",
        help_text="Organisation name or context (e.g. 'WabiSkills', 'Self-Directed').",
    )
    description = models.TextField(
        help_text="Two-to-three sentence description of what happened during this period.",
    )
    order = models.IntegerField(
        default=0,
        help_text="Display order — lower numbers appear first (top of timeline).",
    )

    class Meta:
        ordering = ["order", "year"]
        verbose_name = "Experience / Timeline Entry"
        verbose_name_plural = "Experience / Timeline Entries"

    def __str__(self) -> str:
        return f"{self.year} — {self.role}"


# ---------------------------------------------------------------------------
# Contact Inquiries
# ---------------------------------------------------------------------------

class ContactInquiry(models.Model):
    """
    A contact form submission from the portfolio frontend.
    This model is intentionally read-only in the admin — entries are created
    via the public API only.
    """

    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact Inquiry"
        verbose_name_plural = "Contact Inquiries"

    def __str__(self) -> str:
        return f"{self.name} <{self.email}> — {self.created_at:%Y-%m-%d %H:%M}"

class Profile(models.Model):
    name = models.CharField(max_length=100, default="Nabonsi Niguse")
    title = models.CharField(max_length=200, default="Full-Stack Software Engineer")
    bio_paragraphs = models.TextField(help_text="Newline-separated paragraphs for the About section.")
    avatar = models.ImageField(upload_to='profile/', blank=True, null=True, help_text="Upload your profile photo here.")
    is_available = models.BooleanField(default=True, verbose_name="Available for Hire")

    def __str__(self):
        return f"Profile Configuration - {self.name}"
