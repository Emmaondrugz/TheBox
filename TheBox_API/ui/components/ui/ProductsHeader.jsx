'use client'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useCart } from '../../context/CartContext'

export default function ProductsHeader({ isCartOpen, setIsCartOpen }) {
    const router = useRouter()
    const { cart, setCart } = useCart()

    // Handle user logout
    function Logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setCart(null);
        router.push('/')
        // Refresh ensures all 'IsAuthenticated' checks in the layout re-run
        router.refresh()
    }

    // Calculate total items in box for the badge
    const itemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <div className="flex justify-between items-center py-6 px-4 sm:px-8 border-b border-gray-100 bg-white sticky top-0 z-40">

            {/* Left: Navigation Links */}
            <div className="hidden md:flex gap-8 items-center text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium">
                <p className="hover:text-black cursor-pointer transition-colors">Journal</p>
                <p className="hover:text-black cursor-pointer transition-colors">Whitelist</p>
                <p className="hover:text-black cursor-pointer transition-colors">About</p>
            </div>

            {/* Center: TheBox logo */}
            <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
                <Image
                    src="/logo-2.png"
                    alt="TheBox logo"
                    width={100}
                    height={100}
                    className="w-7 h-7 sm:w-9 sm:h-9 object-contain"
                />
            </div>

            {/* Right: Actions */}
            <div className="flex gap-6 sm:gap-8 items-center">

                {/* Cart Icon Trigger */}
                <div
                    className="relative cursor-pointer group"
                    onClick={() => setIsCartOpen(true)}
                >
                    {/* Dynamic Cart Item Count Badge */}
                    {itemCount > 0 && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 text-[10px] bg-red-600 text-white rounded-full flex items-center justify-center animate-in zoom-in">
                            {itemCount}
                        </div>
                    )}

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000"
                        className="group-hover:scale-110 transition-transform"
                    >
                        <path d="M236.58-118.12q-20.42-20.42-20.42-49.57 0-29.16 20.42-49.58 20.42-20.42 49.57-20.42 29.16 0 49.58 20.42 20.42 20.42 20.42 49.58 0 29.15-20.42 49.57-20.42 20.43-49.58 20.43-29.15 0-49.57-20.43Zm387.69 0q-20.42-20.42-20.42-49.57 0-29.16 20.42-49.58 20.42-20.42 49.58-20.42 29.15 0 49.57 20.42t20.42 49.58q0 29.15-20.42 49.57Q703-97.69 673.85-97.69q-29.16 0-49.58-20.43ZM240.61-730 342-517.69h272.69q3.46 0 6.16-1.73 2.69-1.73 4.61-4.81l107.31-195q2.31-4.23.38-7.5-1.92-3.27-6.54-3.27h-486Zm-28.76-60h555.38q24.54 0 37.11 20.89 12.58 20.88 1.2 42.65L677.38-494.31q-9.84 17.31-26.03 26.96-16.2 9.66-35.5 9.66H324l-46.31 84.61q-3.08 4.62-.19 10 2.88 5.39 8.65 5.39h427.7q12.76 0 21.38 8.61 8.61 8.62 8.61 21.39 0 12.77-8.61 21.38-8.62 8.62-21.38 8.62h-427.7q-40 0-60.11-34.5-20.12-34.5-1.42-68.89l57.07-102.61L136.16-810H90q-12.77 0-21.38-8.62Q60-827.23 60-840t8.62-21.38Q77.23-870 90-870h61.15q10.24 0 19.08 5.42 8.85 5.43 13.46 15.27L211.85-790ZM342-517.69h280-280Z" />
                    </svg>
                </div>

                {/* Logout Button */}
                <div>
                    <button
                        onClick={Logout}
                        className="px-6 py-1.5 border border-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
                    >
                        Log out
                    </button>
                </div>
            </div>

        </div>
    )
}