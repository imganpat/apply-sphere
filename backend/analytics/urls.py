from django.urls import path
from .views import SummaryAnalytics

urlpatterns = [path("summary/", SummaryAnalytics.as_view())]
