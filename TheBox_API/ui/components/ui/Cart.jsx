'use client'
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

export default function Cart({ isCartOpen, setIsCartOpen }) {
    const { cart } = useCart();
    const router = useRouter();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-150 flex justify-end">
            {/* 1. Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setIsCartOpen(false)}
            />

            {/* 2. Cart Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-normal poppins uppercase tracking-tight text-black">Your cart</h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-black hover:scale-110 transition-transform">✕</button>
                </div>

                {/* Items List */}
                <div className="grow overflow-y-auto p-6 space-y-6">
                    {cart?.items?.length > 0 ? (
                        cart.items.map((item) => (
                            <div key={item.id} className="flex gap-4 border-b pb-4 border-gray-50">
                                <div className="w-20 h-20 bg-gray-100 p-2 shrink-0">
                                    <img src={item.product.image_url} alt={item.product.title} className="w-full h-full object-contain" />
                                </div>
                                <div className="grow">
                                    <h4 className="text-sm font-semibold text-black line-clamp-1">{item.product.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                                    <p className="text-sm font-medium mt-1 text-black">${item.product.price}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center mt-10 italic">Your cart is empty.</p>
                    )}
                </div>

                {/* Footer / Checkout Button */}
                <div className="p-6 border-t">
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-normal poppins text-black">${cart?.total_price || "0.00"}</span>
                    </div>
                    <button
                        onClick={() => {
                            setIsCartOpen(false);
                            router.push('/checkout');
                        }}
                        disabled={!cart?.items?.length}
                        className="w-full bg-black text-white py-4 uppercase text-xs tracking-widest hover:bg-neutral-800 transition-colors disabled:bg-gray-300"
                    >
                        Go to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}