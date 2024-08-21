"use client";

import React, { useState, useEffect } from "react";
import OrderSummary from "./order-summary";
import CartList, { CartItem } from "./cart-list";

const initialCartItems: CartItem[] = [
    {
        id: 1,
        name: "수비드 닭가슴살",
        image: "/sample2.jfif",
        price: 75000,
        quantity: 1,
        options: "매운 커리맛",
    },
    {
        id: 2,
        name: "뉴트리핏 엽떡 닭가슴살",
        image: "/sample1.jfif",
        price: 120000,
        quantity: 2,
        options: "땡초맛",
    },
];

export default function Cart() {
    const [cartItems, setCartItems] = useState(initialCartItems);

    const handleQuantityChange = (id: number, quantity: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const handleRemoveItem = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    };

    const handleCheckout = () => {
        // Implement checkout logic here
        alert("Proceeding to checkout...");
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Shopping Cart
            </h1>
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="flex-1 mb-8 lg:mb-0">
                    <CartList
                        items={cartItems}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                    />
                </div>
                <div className="w-full lg:w-1/3">
                    <OrderSummary
                        subtotal={calculateSubtotal()}
                        shipping={3000}
                        onCheckout={handleCheckout}
                    />
                </div>
            </div>
        </div>
    );
}
