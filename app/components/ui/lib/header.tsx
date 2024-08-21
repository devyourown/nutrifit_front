"use client";

import Link from "next/link";
import Navbar from "./navbar";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useState } from "react";
import CartSidebar from "../cart/cart-sidebar";

const items = [
    {
        id: 1,
        name: "수비드 닭가슴살",
        price: 2100,
        quantity: 1,
        imageUrl: "/sample1.jfif",
    },
    // Add more items if needed
];

export default function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState(items);

    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleQuantityChange = (itemId: number, quantity: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };
    return (
        <header className="w-full">
            {/* Top Bar */}
            <CartSidebar
                items={cartItems}
                isOpen={isCartOpen}
                onClose={handleCartToggle}
                onQuantityChange={handleQuantityChange}
            />
            <div className="bg-gray-100 py-2">
                <div className="container mx-auto flex justify-end items-center space-x-4 text-gray-700">
                    <button
                        onClick={handleCartToggle}
                        className="flex items-center space-x-2"
                    >
                        <FaShoppingCart />
                        <span>cart</span>
                    </button>
                    <Link href="/login" className="flex items-center space-x-2">
                        <FaUser />
                        <span>login</span>
                    </Link>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="bg-white py-6">
                <div className="container mx-auto flex flex-col items-center">
                    {/* Logo */}
                    <Link href="/" className="flex flex-col items-center mb-4">
                        {/*<img src="/path-to-your-logo.png" alt="Nutrifit Logo" className="h-8 mr-2" />*/}
                        <span className="text-2xl font-bold text-gray-800">
                            Nutrifit
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="flex space-x-8 text-gray-600 text-sm">
                        <Link
                            href="/shop"
                            className="hover:text-gray-800 transition duration-300"
                        >
                            shop all
                        </Link>
                        <Link
                            href="/subscription"
                            className="hover:text-gray-800 transition duration-300"
                        >
                            subscribe
                        </Link>
                        <Link
                            href="/gift-card"
                            className="hover:text-gray-800 transition duration-300"
                        >
                            gift card
                        </Link>
                        <Link
                            href="/story"
                            className="hover:text-gray-800 transition duration-300"
                        >
                            our story
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
