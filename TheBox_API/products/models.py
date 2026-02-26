from django.db import models

# Create your models here.

class Product(models.Model):
    external_id = models.IntegerField(unique=True, null=True, blank=True)
    title = models.CharField(max_length=225)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    category = models.CharField( max_length=100)
    image_url = models.URLField(max_length=500)

    def __str__(self):
        return self.title