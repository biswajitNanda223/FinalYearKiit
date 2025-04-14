from django.contrib import admin

# Register your models here.

from django.contrib.auth.admin import UserAdmin
from .models import CustomUser,Doctor, ContactMessage

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("id", "email", "username", "age", "gender", "is_staff", "is_active")
    search_fields = ("email", "username")
    ordering = ("email",)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Doctor)
admin.site.register(ContactMessage)
admin.site.site_header = "HealthMate Admin"
admin.site.site_title = "HealthMate Admin Portal"
admin.site.index_title = "Welcome to HealthMate Admin Portal"
# admin.site.site_url = "/admin/"  # Set the URL to redirect to after login/logout
   
