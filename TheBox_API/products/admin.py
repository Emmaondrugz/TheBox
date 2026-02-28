from django.contrib import admin
from .models import Product # Import your model

class ProductAdmin(admin.ModelAdmin):
    # These columns will appear in your admin list view
    list_display = ('title', 'price', 'category', 'external_id')
    
    # Adds a sidebar filter for categories
    list_filter = ('category',)
    
    # Adds a search bar for titles and descriptions
    search_fields = ('title', 'description')

admin.site.register(Product, ProductAdmin)
