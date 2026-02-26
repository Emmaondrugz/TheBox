from products.models import Product
from django.core.management.base import BaseCommand
import requests

class Command(BaseCommand):
    help = 'Syncs products from FakeStore API to local database'

    # Added 'self', '*args', and '**options' here
    def handle(self, *args, **options):
        api_url = 'https://fakestoreapi.com/products'
        
        try:
            response = requests.get(api_url)
            response.raise_for_status() # Check if the external API is down
            data = response.json()

            for product in data:
                Product.objects.update_or_create(
                    external_id=product['id'],
                    defaults={
                        'title': product['title'],
                        'price': product['price'],
                        'description': product['description'],
                        'category': product['category'],
                        'image_url': product['image']
                    }
                )
            # Use self.stdout.write instead of print for better logging
            self.stdout.write(self.style.SUCCESS('Successfully synced all products!'))
            
        except requests.exceptions.RequestException as e:
            self.stdout.write(self.style.ERROR(f'Error fetching data: {e}'))