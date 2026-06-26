"""
Django Admin configuration for the Nabonsi portfolio backend.

Design goals:
  - Log in to /admin/ on day one and immediately understand what to do.
  - Every field shown on the React frontend is fully editable here.
  - ContactInquiry is view/delete only — no accidental edits or additions.
  - `order` fields are list_editable for quick inline reordering.
  - Profile is a singleton — only one record can exist (add is hidden once created).
"""

from django.contrib import admin
from django.utils.html import format_html

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
# Admin site branding
# ---------------------------------------------------------------------------

admin.site.site_header = "Nabonsi Portfolio — Admin"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Content Management"


# ---------------------------------------------------------------------------
# Profile (singleton)
# ---------------------------------------------------------------------------

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    """
    There should be exactly one profile record.
    Once it exists, the 'Add Profile' button is hidden to prevent duplicates.
    The frontend reads profile[0] from GET /api/profile/.
    """

    list_display  = ["name", "title", "is_available", "has_avatar"]
    list_display_links = ["name"]
    readonly_fields   = []

    fieldsets = (
        (
            "Identity",
            {
                "fields": ("name", "title", "is_available"),
                "description": (
                    "Your public name and headline. "
                    "'Available for Hire' controls the badge shown on the About section."
                ),
            },
        ),
        (
            "About / Bio",
            {
                "fields": ("bio_paragraphs",),
                "description": (
                    "Write one paragraph per line. "
                    "Each line is rendered as a separate paragraph in the About section."
                ),
            },
        ),
        (
            "Profile Photo",
            {
                "fields": ("avatar",),
                "description": "Upload a square photo (min 400×400 px, JPG or PNG).",
            },
        ),
    )

    def has_add_permission(self, request) -> bool:
        """Prevent a second profile being created once one exists."""
        return not Profile.objects.exists()

    @admin.display(description="Avatar", boolean=True)
    def has_avatar(self, obj: Profile) -> bool:
        return bool(obj.avatar)


# ---------------------------------------------------------------------------
# Skills
# ---------------------------------------------------------------------------

class SkillInline(admin.TabularInline):
    """
    Inline skill tags under each SkillGroup.
    Each row = one badge displayed on the Skills section.
    """

    model = Skill
    extra = 1
    fields = ["name", "order"]
    ordering = ["order", "name"]
    verbose_name = "Skill Tag"
    verbose_name_plural = "Skill Tags  (each row = one badge on the frontend)"


@admin.register(SkillGroup)
class SkillGroupAdmin(admin.ModelAdmin):
    inlines = [SkillInline]
    list_display  = ["category", "icon_name", "order", "skill_count"]
    list_editable  = ["icon_name", "order"]
    list_display_links = ["category"]
    ordering = ["order", "category"]
    search_fields = ["category"]

    fieldsets = (
        (
            "Group Settings",
            {
                "fields": ("category", "icon_name", "order"),
                "description": (
                    "icon_name must be a valid Lucide React icon name — "
                    "e.g. 'Code2', 'Globe', 'Database', 'Network'. "
                    "See lucide.dev for the full list."
                ),
            },
        ),
    )

    @admin.display(description="# Skills")
    def skill_count(self, obj: SkillGroup) -> int:
        return obj.skills.count()


# ---------------------------------------------------------------------------
# Projects
# ---------------------------------------------------------------------------

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ["title", "order", "has_github", "has_demo", "has_image"]
    list_editable  = ["order"]
    list_display_links = ["title"]
    ordering = ["order", "title"]
    search_fields = ["title", "summary"]

    fieldsets = (
        (
            "Core Content",
            {
                "fields": ("title", "summary", "order"),
                "description": "Title and one-line summary appear on the project card header.",
            },
        ),
        (
            "Tech Stack",
            {
                "fields": ("tags",),
                "description": (
                    "Comma-separated technology names exactly as they should appear "
                    "on the badge row — e.g.  'Django, React, PostgreSQL, Tailwind CSS'."
                ),
            },
        ),
        (
            "Feature Highlights",
            {
                "fields": ("bullet_points",),
                "description": (
                    "One feature per line. Each line becomes one bullet point on the card.\n"
                    "Example:\n"
                    "  Role-based access: instructor, student, and admin dashboards\n"
                    "  JWT authentication with token refresh flow"
                ),
            },
        ),
        (
            "Links",
            {
                "fields": ("github_link", "live_link"),
                "description": (
                    "Leave blank if not available — the card shows a disabled placeholder."
                ),
            },
        ),
        (
            "Media",
            {
                "fields": ("image",),
                "description": "Optional project screenshot. 16:9 ratio recommended (PNG or JPG).",
            },
        ),
    )

    @admin.display(description="GitHub", boolean=True)
    def has_github(self, obj: Project) -> bool:
        return bool(obj.github_link)

    @admin.display(description="Demo", boolean=True)
    def has_demo(self, obj: Project) -> bool:
        return bool(obj.live_link)

    @admin.display(description="Image", boolean=True)
    def has_image(self, obj: Project) -> bool:
        return bool(obj.image)


# ---------------------------------------------------------------------------
# Certifications
# ---------------------------------------------------------------------------

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display  = ["title", "issuer", "year", "order", "has_badge", "has_verify_link"]
    list_editable  = ["order"]
    list_display_links = ["title"]
    ordering = ["order", "year"]
    search_fields = ["title", "issuer"]

    fieldsets = (
        (
            "Credential Details",
            {
                "fields": ("title", "issuer", "year", "order"),
            },
        ),
        (
            "Description",
            {
                "fields": ("description",),
                "description": "1–2 sentences shown in the card body describing what this validates.",
            },
        ),
        (
            "Links & Media",
            {
                "fields": ("verify_link", "badge"),
                "description": "Both are optional. Leave blank if not applicable.",
            },
        ),
    )

    @admin.display(description="Badge", boolean=True)
    def has_badge(self, obj: Certification) -> bool:
        return bool(obj.badge)

    @admin.display(description="Verify Link", boolean=True)
    def has_verify_link(self, obj: Certification) -> bool:
        return bool(obj.verify_link)


# ---------------------------------------------------------------------------
# Experience / Timeline
# ---------------------------------------------------------------------------

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display  = ["year", "role", "company", "order"]
    list_editable  = ["order"]
    list_display_links = ["year", "role"]
    ordering = ["order", "year"]
    search_fields = ["role", "company", "year"]

    fieldsets = (
        (
            "Timeline Entry",
            {
                "fields": ("year", "role", "company", "order"),
                "description": (
                    "'year' is the label on the timeline dot — e.g. '2024' or 'Now'.\n"
                    "'role' becomes the card title on the frontend.\n"
                    "'company' is the organisation or context label shown beneath the title."
                ),
            },
        ),
        (
            "Description",
            {
                "fields": ("description",),
                "description": "2–3 sentences describing this milestone. Shown in the timeline card body.",
            },
        ),
    )


# ---------------------------------------------------------------------------
# Contact Inquiries — view & delete only, no add or edit
# ---------------------------------------------------------------------------

@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    """
    Submissions arrive exclusively via the public API contact form.
    Read and delete are allowed; add and change are not.
    """

    list_display  = ["name", "email", "short_message", "created_at"]
    list_display_links = ["name", "email"]
    ordering = ["-created_at"]
    search_fields = ["name", "email"]
    readonly_fields = ["name", "email", "message", "created_at"]
    date_hierarchy = "created_at"

    def has_add_permission(self, request) -> bool:
        return False

    def has_change_permission(self, request, obj=None) -> bool:
        return False

    def has_delete_permission(self, request, obj=None) -> bool:
        return True

    @admin.display(description="Message Preview")
    def short_message(self, obj: ContactInquiry) -> str:
        preview = obj.message[:80]
        return preview + "…" if len(obj.message) > 80 else preview
