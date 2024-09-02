"use client";

import React, { useState } from "react";
import OrderSummary from "./order-summary";
import CartList from "./cart-list";
import { CartItem } from "@/app/lib/types/definition";
import { changeItemQuantity, deleteItem } from "@/app/lib/trigger";
import { removeItemFromCart, updateCartItemQuantity } from "@/app/lib/api/cart";


interface CartProps {
    items: CartItem[];
}

export default function Cart({items}: CartProps) {
    const [cartItems, setCartItems] = useState(items);

    const handleQuantityChange = (id: number, quantity: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
        const userId = localStorage.getItem('id');
        changeItemQuantity(userId!, id, quantity);
        const token = localStorage.getItem('jwt');
        if (token) {
            updateCartItemQuantity(token, id, quantity);
        }
    };

    const handleRemoveItem = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        const userId = localStorage.getItem('id');
        deleteItem(userId!, id);
        const token = localStorage.getItem('jwt');
        if (token) {
            removeItemFromCart(token, id);
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">장바구니</h1>
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
                        items={cartItems}
                        subtotal={calculateSubtotal()}
                        shipping={0}
                    />
                </div>
            </div>
        </div>
    );
}
