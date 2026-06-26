# Generated migration for the Nabonsi portfolio app.

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        # ------------------------------------------------------------------ #
        # SkillGroup                                                          #
        # ------------------------------------------------------------------ #
        migrations.CreateModel(
            name="SkillGroup",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("Backend", "Backend"),
                            ("Frontend", "Frontend"),
                            ("Database", "Database"),
                            ("Core & Networking", "Core & Networking"),
                        ],
                        help_text="The skill group label shown on the frontend card.",
                        max_length=30,
                        unique=True,
                    ),
                ),
                (
                    "icon_name",
                    models.CharField(
                        help_text=(
                            "Lucide icon component name (e.g. 'Code2', 'Globe', 'Database', 'Network'). "
                            "Must match an exported name from lucide-react."
                        ),
                        max_length=60,
                    ),
                ),
                (
                    "order",
                    models.IntegerField(
                        default=0,
                        help_text="Display order — lower numbers appear first.",
                    ),
                ),
            ],
            options={
                "verbose_name": "Skill Group",
                "verbose_name_plural": "Skill Groups",
                "ordering": ["order", "category"],
            },
        ),
        # ------------------------------------------------------------------ #
        # Skill                                                               #
        # ------------------------------------------------------------------ #
        migrations.CreateModel(
            name="Skill",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        help_text="Skill label exactly as it should appear on the badge.",
                        max_length=100,
                    ),
                ),
                (
                    "order",
                    models.IntegerField(
                        default=0,
                        help_text="Display order within this group — lower numbers appear first.",
                    ),
                ),
                (
                    "group",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="skills",
                        to="portfolio.skillgroup",
                    ),
                ),
            ],
            options={
                "verbose_name": "Skill",
                "verbose_name_plural": "Skills",
                "ordering": ["order", "name"],
            },
        ),
        # ------------------------------------------------------------------ #
        # Project                                                             #
        # ------------------------------------------------------------------ #
        migrations.CreateModel(
            name="Project",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                (
                    "summary",
                    models.TextField(
                        help_text="One punchy sentence describing what the project does and why."
                    ),
                ),
                (
                    "tags",
                    models.CharField(
                        help_text="Comma-separated tech stack tags (e.g. 'Django, React, PostgreSQL').",
                        max_length=500,
                    ),
                ),
                (
                    "bullet_points",
                    models.TextField(
                        help_text="One feature highlight per line.",
                    ),
                ),
                (
                    "github_link",
                    models.URLField(
                        blank=True,
                        null=True,
                        verbose_name="GitHub URL",
                    ),
                ),
                (
                    "live_link",
                    models.URLField(
                        blank=True,
                        null=True,
                        verbose_name="Live Demo URL",
                    ),
                ),
                (
                    "image",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to="projects/",
                    ),
                ),
                (
                    "order",
                    models.IntegerField(
                        default=0,
                        help_text="Display order — lower numbers appear first.",
                    ),
                ),
            ],
            options={
                "verbose_name": "Project",
                "verbose_name_plural": "Projects",
                "ordering": ["order", "title"],
            },
        ),
        # ------------------------------------------------------------------ #
        # Certification                                                       #
        # ------------------------------------------------------------------ #
        migrations.CreateModel(
            name="Certification",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "title",
                    models.CharField(
                        help_text="Full credential name.",
                        max_length=300,
                        verbose_name="Credential Title",
                    ),
                ),
                (
                    "issuer",
                    models.CharField(
                        help_text="Issuing organisation.",
                        max_length=200,
                    ),
                ),
                (
                    "year",
                    models.CharField(
                        help_text="Four-digit year of issue (e.g. '2024').",
                        max_length=4,
                        validators=[django.core.validators.MaxLengthValidator(4)],
                    ),
                ),
                (
                    "description",
                    models.TextField(
                        help_text="One or two sentences describing what this credential validates.",
                    ),
                ),
                (
                    "verify_link",
                    models.URLField(
                        blank=True,
                        null=True,
                        verbose_name="Verify URL",
                    ),
                ),
                (
                    "badge",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to="certifications/",
                    ),
                ),
                (
                    "order",
                    models.IntegerField(
                        default=0,
                        help_text="Display order — lower numbers appear first.",
                    ),
                ),
            ],
            options={
                "verbose_name": "Certification",
                "verbose_name_plural": "Certifications",
                "ordering": ["order", "year"],
            },
        ),
        # ------------------------------------------------------------------ #
        # Experience                                                          #
        # ------------------------------------------------------------------ #
        migrations.CreateModel(
            name="Experience",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "year",
                    models.CharField(
                        help_text="Year label as displayed (e.g. '2024 - Present' or 'Now').",
                        max_length=30,
                    ),
                ),
                (
                    "role",
                    models.CharField(
                        help_text="Short title for this milestone.",
                        max_length=200,
                        verbose_name="Title / Role",
                    ),
                ),
                (
                    "company",
                    models.CharField(
                        help_text="Organisation name or context.",
                        max_length=200,
                        verbose_name="Organisation / Context",
                    ),
                ),
                (
                    "description",
                    models.TextField(
                        help_text="Two-to-three sentence description of this period.",
                    ),
                ),
                (
                    "order",
                    models.IntegerField(
                        default=0,
                        help_text="Display order — lower numbers appear first.",
                    ),
                ),
            ],
            options={
                "verbose_name": "Experience / Timeline Entry",
                "verbose_name_plural": "Experience / Timeline Entries",
                "ordering": ["order", "year"],
            },
        ),
        # ------------------------------------------------------------------ #
        # ContactInquiry                                                      #
        # ------------------------------------------------------------------ #
        migrations.CreateModel(
            name="ContactInquiry",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                ("email", models.EmailField(max_length=254)),
                ("message", models.TextField()),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True),
                ),
            ],
            options={
                "verbose_name": "Contact Inquiry",
                "verbose_name_plural": "Contact Inquiries",
                "ordering": ["-created_at"],
            },
        ),
    ]
