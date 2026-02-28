'use client'

import ProductsHeader from '../../../components/ui/ProductsHeader'
import { useEffect, useState } from 'react'
import Skeleton from '../../../components/ui/Skeleton'
import Review from '../../../components/ui/Review'

export default function Products() {
    const [activeCategory, setActiveCategory] = useState('All')
    const categories = ['All', 'Men', 'Women', 'Jewelries', 'Electronics']
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState(null)
    const [isOpen, setIsOpen] = useState(false)


    useEffect(() => {
        const fetch_products = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/products/')
                const data = await response.json()
                if (data) {
                    // Ensure we handle pagination 'results' or direct array
                    setProducts(data.results || data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.error('Error: ', error)
            }
        }
        fetch_products()
    }, [])

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
            <ProductsHeader />

            {/* Category buttons section */}
            <div className='flex gap-4 mt-6 text-black justify-center'>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 transition-all ${activeCategory === cat
                            ? 'bg-black text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="mt-8 flex flex-wrap gap-4 mx-auto justify-center">
                {!products || isLoading ? (
                    <Skeleton />
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <div key={item.id} className="card w-[300px] h-fit bg-base-100 border border-[#f2f2f2]">
                            <figure className="h-[200px] bg-white p-6">
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="h-full w-full object-contain"
                                />
                            </figure>

                            <div className="card-body p-5 flex flex-col justify-between">
                                <div>
                                    <div className="text-xs mb-2 opacity-60 uppercase">
                                        {item.category}
                                    </div>
                                    <h2 className="text-[13px] font-normal montserrat w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                                        {item.title}
                                    </h2>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm poppins">${item.price}</p>
                                    <button className="flex bg-black text-white py-2 px-3 cursor-pointer justify-between items-center hover:bg-gray-800 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                                            <path d="M450-450H250q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63-21.37Q237.25-510 250-510h200v-200q0-12.75 8.63-21.37 8.63-8.63 21.38-8.63 12.76 0 21.37 8.63Q510-722.75 510-710v200h200q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37Q722.75-450 710-450H510v200q0 12.75-8.63 21.37-8.63 8.63-21.38 8.63-12.76 0-21.37-8.63Q450-237.25 450-250v-200Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 mt-10">No products found in this category.</div>
                )}
            </div>

            {/* product review modal */}
            <div>
                <Review isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </div>
    )
}