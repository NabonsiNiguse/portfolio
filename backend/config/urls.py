"""
Root URL configuration.
All portfolio API routes are delegated to the portfolio app.
Static/media files are served locally during development.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
 

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("portfolio.urls")),
]

# Serve uploaded media files in development
# In production, delegate this to NGINX / S3 / CloudFront.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
