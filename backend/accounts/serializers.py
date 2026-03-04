from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("email", "full_name", "password")

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],  
            full_name = validated_data["full_name"],
            password=validated_data["password"]
        )
        return user
    
    def to_representation(self, instance):
        refresh = RefreshToken.for_user(instance)

        return {
            "user": {
                "id": instance.id,
                "email": instance.email,
                "full_name": instance.full_name,
            },
            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
        }

