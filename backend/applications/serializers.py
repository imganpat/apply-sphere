from rest_framework import serializers
from .models import JobApplication


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        exclude = ("user",)
