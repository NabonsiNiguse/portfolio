# Migration: creates the Profile singleton table.
# Depends on both 0002 migrations to resolve the branch conflict.

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        # The manually written profile migration (may or may not be applied)
        ("portfolio", "0002_profile"),
        # The auto-generated alter-fields migration
        ("portfolio", "0002_alter_certification_badge_alter_certification_issuer_and_more"),
    ]

    operations = [
        # Only create the table if it doesn't already exist.
        # Using SeparateDatabaseAndState so Django tracks it as applied
        # even when the 0002_profile branch was previously run.
        migrations.RunSQL(
            sql="""
            CREATE TABLE IF NOT EXISTS "portfolio_profile" (
                "id"              integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                "name"            varchar(100) NOT NULL,
                "title"           varchar(200) NOT NULL,
                "bio_paragraphs"  text NOT NULL,
                "avatar"          varchar(100) NULL,
                "is_available"    bool NOT NULL
            );
            """,
            reverse_sql='DROP TABLE IF EXISTS "portfolio_profile";',
        ),
    ]
