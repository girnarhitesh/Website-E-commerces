// 📁 src/Components/ProductsSection/CartContext.jsx
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // ✅ Add to cart with proper structure
    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            } else {
                return [...prev, { ...product, qty: 1 }];
            }
        });
    };

    // ✅ Remove item
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // ✅ Calculate total correctly
    const total = cart.reduce(
        (sum, item) => sum + (item.price || 0) * (item.qty || 1),
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                total,
                searchQuery,
                setSearchQuery,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};