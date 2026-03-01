from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *  # This is your AbstractUser class


class CartAdmin(admin.ModelAdmin):
    # These columns will appear in your admin list view
    list_display = ('user', 'created_at')
    
    # Adds a sidebar filter for categories
    list_filter = ('user',)
    
    # Adds a search bar for titles and descriptions
    search_fields = ('user', 'created_at')

admin.site.register(Cart, CartAdmin)

# You use UserAdmin so you get the nice layout with permissions and groups
admin.site.register(User, UserAdmin)
