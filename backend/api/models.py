from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # Email as the unique identifier
    username = models.CharField(max_length=255, unique=True)  # Username = Name
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10)

    USERNAME_FIELD = "email"  # Email is used for login
    REQUIRED_FIELDS = ["username", "age", "gender"]  # Fields required when creating a user

    def __str__(self):
        return self.username


class Doctor(models.Model):
    name = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255)
    hospital = models.CharField(max_length=255)
    experience = models.IntegerField()
    contact = models.CharField(max_length=20)
    general_specialization = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"    