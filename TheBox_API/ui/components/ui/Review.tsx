'use client'

import React from 'react'; // Import React for MouseEvent type

type ReviewProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    // Updated type to React.MouseEvent to match Next.js/React standards
    handleAddToCart: (e: React.MouseEvent, item_id: number) => void;
    product?: any;
}

export default function Review({ isOpen, setIsOpen, product, handleAddToCart }: ReviewProps) {
    if (!isOpen || !product) return null; // Safety check: don't render if product is null

    const onClose = () => setIsOpen(false);

    // Optimized wrapper to handle the add and close the modal
    const onAddClick = (e: React.MouseEvent) => {
        handleAddToCart(e, product.id);
        // Optional: Close modal after adding so the user sees the cart open
        // onClose(); 
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* 1. Glassmorphism Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-all duration-500"
                onClick={onClose}
            />

            {/* 2. Modal Content */}
            <div className="relative bg-white w-full max-w-5xl h-[85vh] md:h-[600px] shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-20 cursor-pointer hover:rotate-90 transition-transform duration-200 p-2 rounded-full hover:bg-gray-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                {/* LEFT SECTION: Visuals */}
                <div className="w-full md:w-1/2 bg-[#FBFBFB] flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-gray-100">
                    <div className="w-full h-full aspect-square bg-white flex items-center justify-center p-12">
                        <img
                            src={product?.image_url}
                            alt={product?.title}
                            className="max-h-full w-full object-contain hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* RIGHT SECTION: Content/Form */}
                <div className="w-full md:w-1/2 bg-white p-10 md:p-16 overflow-y-auto">
                    <div className="h-full flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-medium">
                            {product?.category}
                        </span>
                        <h3 className="montserrat text-2xl font-light text-black mb-6 leading-tight">
                            {product?.title}
                        </h3>

                        <div className="flex-grow space-y-6">
                            <div className="flex items-baseline gap-4">
                                <span className="text-xl font-semibold poppins">${product?.price}</span>
                                <span className="text-[10px] text-green-600 uppercase tracking-widest font-bold">In Stock</span>
                            </div>
                            <div className="h-px bg-gray-100 w-full" />
                            <p className="text-gray-600 font-light text-[13px] poppins tracking-wider leading-relaxed">
                                {product?.description}
                            </p>
                        </div>

                        {/* ADD TO CART ACTION */}
                        <button
                            onClick={onAddClick}
                            className="w-full cursor-pointer bg-black text-white py-4 mt-8 uppercase text-[11px] tracking-[0.2em] font-bold hover:bg-neutral-800 transition-all active:scale-[0.98]"
                        >
                            Add to box
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}