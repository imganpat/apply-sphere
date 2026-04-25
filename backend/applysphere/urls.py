from django.urls import path, include
from django.http import JsonResponse
from accounts.views import RegisterView
from jobs.views import JobApplicationViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from analytics.views import SummaryAnalytics


def home(request):
    return JsonResponse({"message": "Welcome to ApplySphere API!"})


router = DefaultRouter()

router.register(r"api/jobs", JobApplicationViewSet, basename="job_applications")

urlpatterns = [
    path("", home, name="home"),
    # auth
    path(
        "api/register/",
        RegisterView.as_view(),
        name="register",
    ),
    path("api/login/", TokenObtainPairView.as_view(), name="login"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # path("api/jobs/", JobApplicationViewSet.as_view({"get": "list", "post": "create"}), name="job_applications")
    path("api/analytics/", include("analytics.urls")),
]

urlpatterns += router.urls
