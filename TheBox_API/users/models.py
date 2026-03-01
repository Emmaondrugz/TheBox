from itertools import product
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

# Create your models here.
class User(AbstractUser):

    def __str__(self):
        return self.username


class Cart(models.Model):
    # Use settings.AUTH_USER_MODEL for best practice in custom user models
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart for {self.user.username}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    # This connects the entry to the actual product from your synced data
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    # This tracks how many of this specific product are in the cart
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.title}"