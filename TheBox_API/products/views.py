from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from products.serializer import ProductSerializer
from .models import Product

# Create your views here.
class ProductsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]