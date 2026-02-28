from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # Swap 'url' for 'id' or 'external_id'
        fields = ('id', 'external_id', 'title', 'price', 'description', 'category', 'image_url')