'use client'

import ProductsHeader from '../../../components/ui/ProductsHeader'
import { useEffect, useState } from 'react'
import Skeleton from '../../../components/ui/Skeleton'
import Review from '../../../components/ui/Review'
import Cart from '../../../components/ui/Cart'
import { useCart } from '../../../context/CartContext' // 1. Import useCart

export default function Products() {
    const [activeCategory, setActiveCategory] = useState('All')
    const categories = ['All', 'Men', 'Women', 'Jewelries', 'Electronics']
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [reviewItem, setReviewItem] = useState(null)
    const [isCartOpen, setIsCartOpen] = useState(false)

    const { fetchCart } = useCart() // 2. Pull fetchCart from context

    useEffect(() => {
        const fetch_products = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/products/')
                const data = await response.json()
                if (data) {
                    setProducts(data.results || data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.error('Error: ', error)
            }
        }
        fetch_products()
    }, [])

    // 3. Add to Cart Logic
    const handleAddToCart = async (e, productId) => {
        e.stopPropagation(); // Prevents opening the Review Modal when clicking add

        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert("Please login to add items to your box.");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ product_id: productId })
            });

            if (response.ok) {
                fetchCart(); // Refresh the cart badge in header
                setIsCartOpen(true); // Optional: Open the cart drawer automatically
            } else {
                console.error("Failed to add to cart");
            }
        } catch (error) {
            console.error("Cart Error:", error);
        }
    }

    // --- CATEGORY FILTER LOGIC ---
    const filteredProducts = products?.filter((item) => {
        if (activeCategory === 'All') return true;
        const cat = item.category.toLowerCase();
        if (activeCategory === 'Men') return cat === "men's clothing";
        if (activeCategory === 'Women') return cat === "women's clothing";
        if (activeCategory === 'Jewelries') return cat === "jewelery";
        if (activeCategory === 'Electronics') return cat === "electronics";
        return true;
    });

    return (
        <div className="px-4 py-4">
            <ProductsHeader isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

            {/* Category buttons section */}
            <div className='flex gap-4 mt-6 text-black justify-center'>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 text-xs uppercase tracking-widest transition-all ${activeCategory === cat
                            ? 'bg-black text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="mt-8 flex flex-wrap gap-6 mx-auto justify-center max-w-7xl">
                {!products || isLoading ? (
                    <Skeleton />
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <div
                            onClick={() => {
                                setIsOpen(true);
                                setReviewItem(item);
                            }}
                            key={item.id}
                            className="group cursor-pointer w-[280px] bg-white border border-gray-100 hover:shadow-xl transition-all duration-500"
                        >
                            <figure className="h-[250px] overflow-hidden p-8 relative">
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Overlay effect on hover */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </figure>

                            <div className="p-5">
                                <div className="text-[10px] opacity-40 uppercase tracking-widest mb-1">
                                    {item.category}
                                </div>
                                <h2 className="text-[13px] font-medium montserrat truncate mb-4">
                                    {item.title}
                                </h2>

                                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                                    <p className="text-sm poppins font-semibold text-black">${item.price}</p>

                                    {/* 4. Updated Add to Cart Button */}
                                    <button
                                        onClick={(e) => handleAddToCart(e, item.id)}
                                        className="bg-black text-white p-2 hover:bg-neutral-800 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff">
                                            <path d="M450-450H250q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63-21.37Q237.25-510 250-510h200v-200q0-12.75 8.63-21.37 8.63-8.63 21.38-8.63 12.76 0 21.37 8.63Q510-722.75 510-710v200h200q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37Q722.75-450 710-450H510v200q0 12.75-8.63 21.37-8.63 8.63-21.38 8.63-12.76 0-21.37-8.63Q450-237.25 450-250v-200Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 mt-10">No products found.</div>
                )}
            </div>

            <Review handleAddToCart={handleAddToCart} isOpen={isOpen} setIsOpen={setIsOpen} product={reviewItem} />
            <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </div >
    )
}