"use client";

import React, { useState } from "react";
import OrderSummary from "./order-summary";
import CartList from "./cart-list";
import { CartItem } from "@/app/lib/types/definition";


interface CartProps {
    items: CartItem[];
    setCartItems: (value: React.SetStateAction<CartItem[]>) => void;
}

export default function Cart({items, setCartItems}: CartProps) {
    const calculateSubtotal = () => {
        return items.reduce(
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
                        items={items}
                        setCartItems={setCartItems}
                    />
                </div>
                <div className="w-full lg:w-1/3">
                    <OrderSummary
                        items={items}
                        subtotal={calculateSubtotal()}
                        shipping={0}
                    />
                </div>
            </div>
        </div>
    );
}
