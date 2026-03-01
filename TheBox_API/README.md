# THE BOX | E-commerce Middleware

**The Box** is a simple e-commerce middleware application designed to bridge external product data with a secure, custom-built user management system. It features a decoupled architecture using **Django REST Framework (DRF)** for the backend and **Next.js** for the frontend.

---

### Tech Stack

* **Backend:** Django, Django REST Framework, SQLite/PostgreSQL
* **Frontend:** Next.js 14 (App Router), Tailwind CSS,
* **State Management:** React Context API
* **Authentication:** JWT (JSON Web Tokens) via SimpleJWT
* **Typography:** Montserrat & Poppins

---

## Getting Started

### 1. Database Initialization & Product Sync
The core feature of this middleware is its ability to synchronize data from an external API (FakeStoreAPI) into a local database. This allows for faster performance and persistent user interactions.

```bash
# Clone the repository
git clone [https://github.com/Emmaondrugz/TheBox.git]

# Navigate to backend and install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# SYNC PRODUCTS FROM EXTERNAL API
python manage.py sync_products



## Getting Started

# Start Django Server (Port 8000)
python manage.py runserver

# Start Next.js Development Server (Port 3000)
cd ui
npm install
npm run dev


## Method,Endpoint,Description
POST,/api/register/ - Create a new user account
POST,/api/login/ - Obtain JWT tokens
GET,/api/products/ - List all synced products
GET,/api/cart/ - Fetch current user's cart and items
POST,/api/cart/ - Add an item to the user's box