"""
Portfolio app URL configuration.

Mounted under /api/ in config/urls.py.

Full URL surface:
  GET  /api/profile/
  GET  /api/profile/{id}/
  GET  /api/skills/
  GET  /api/skills/{id}/
  GET  /api/projects/
  GET  /api/projects/{id}/
  GET  /api/certifications/
  GET  /api/certifications/{id}/
  GET  /api/experience/
  GET  /api/experience/{id}/
  POST /api/contact/
"""

from rest_framework.routers import DefaultRouter
from .views import (
    CertificationViewSet,
    ContactInquiryViewSet,
    ExperienceViewSet,
    ProfileViewSet,
    ProjectViewSet,
    SkillGroupViewSet,
)

router = DefaultRouter()
router.register(r"profile",        ProfileViewSet,        basename="profile")
router.register(r"skills",         SkillGroupViewSet,     basename="skill-group")
router.register(r"projects",       ProjectViewSet,        basename="project")
router.register(r"certifications", CertificationViewSet,  basename="certification")
router.register(r"experience",     ExperienceViewSet,     basename="experience")
router.register(r"contact",        ContactInquiryViewSet, basename="contact")

urlpatterns = router.urls
