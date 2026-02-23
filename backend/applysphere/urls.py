from django.urls import path
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message":"Welcome to ApplySphere API!"})

urlpatterns = [
    path("", home, name="home"),
]
