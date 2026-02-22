from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = None  

    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=150)

    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name"]

    def __str__(self):
        return self.email