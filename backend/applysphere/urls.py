from django.urls import path
from django.http import JsonResponse
from accounts.views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


def home(request):
    return JsonResponse({"message": "Welcome to ApplySphere API!"})


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
]
