# Migration: adds the Profile singleton model.

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Profile",
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
                    models.CharField(default="Nabonsi Niguse", max_length=100),
                ),
                (
                    "title",
                    models.CharField(
                        default="Full-Stack Software Engineer", max_length=200
                    ),
                ),
                (
                    "bio_paragraphs",
                    models.TextField(
                        help_text="Newline-separated paragraphs for the About section."
                    ),
                ),
                (
                    "avatar",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to="profile/",
                        help_text="Upload your profile photo here.",
                    ),
                ),
                (
                    "is_available",
                    models.BooleanField(
                        default=True, verbose_name="Available for Hire"
                    ),
                ),
            ],
            options={
                "verbose_name": "Profile",
                "verbose_name_plural": "Profile Configuration",
            },
        ),
    ]
