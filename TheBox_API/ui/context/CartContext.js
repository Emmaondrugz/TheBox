'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    // Fetch the user's persistent cart from the backend
    const fetchCart = async () => {
        const token = localStorage.getItem('accessToken');

        // GUARD: If no token, don't even try to fetch (prevents the 401)
        if (!token) {
            console.log("No token found, skipping cart fetch.");
            return;
        }

        try {
            const res = await fetch('http://127.0.0.1:8000/api/users/cart/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();

            // FIX: If data is an array, take the first item. 
            // If it's already an object, use it as is.
            if (Array.isArray(data) && data.length > 0) {
                setCart(data[0]);
            } else if (Array.isArray(data) && data.length === 0) {
                setCart(null);
            } else {
                setCart(data);
            }
        } catch (err) {
            console.error("Fetch Cart Error:", err);
        }
    };

    // ADD THIS: Automatically fetch cart on mount or when token is present
    useEffect(() => {
        fetchCart();
    }, []); // Runs once when the app/provider loads

    return (
        <CartContext.Provider value={{ cart, setCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);