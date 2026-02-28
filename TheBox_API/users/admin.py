from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User  # This is your AbstractUser class

# You use UserAdmin so you get the nice layout with permissions and groups
admin.site.register(User, UserAdmin)