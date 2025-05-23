"use client";

import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import CartSidebar from "../cart/cart-sidebar";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Cart, CartItem } from "@/app/lib/types/definition";
import { generateUniqueId } from "@/app/lib/generator";
import { useAuth } from "@/app/lib/use-auth";

export default function Header() {
    const { logout, isLoggedIn, authLoading } = useAuth();
    const [username, setUsername] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const router = useRouter();
    const updateUsername = () => {
        const tempUser = localStorage.getItem("username");
        setUsername(tempUser || "");
    };

    const updateCart = async () => {
        let id = localStorage.getItem("id");
        if (!id) {
            id = generateUniqueId();
            localStorage.setItem("id", id);
        }
        const response = await fetch(`/api/cart?id=${id}`);
        let cart: Cart = (await response.json()) as Cart;
        setCartItems(cart.items);
    };

    useEffect(() => {
        if (authLoading) {
            return;
        }
        updateUsername();
        window.addEventListener("usernameUpdated", updateUsername);

        updateCart();
        const openCart = () => setIsCartOpen(true);
        window.addEventListener("cartUpdated", updateCart);
        window.addEventListener("cartOpen", openCart);

        return () => {
            window.removeEventListener("cartUpdated", updateCart);
            window.removeEventListener("usernameUpdated", updateUsername);
            window.removeEventListener("cartOpen", openCart);
        };
    }, [authLoading, isLoggedIn]);

    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    };

    const logoutHeader = () => {
        logout();
        setUsername("");
        router.push("/");
    };
    return (
        <header className="w-full">
            {/* Top Bar */}
            <CartSidebar
                items={cartItems}
                isOpen={isCartOpen}
                onClose={handleCartToggle}
                setCartItems={setCartItems}
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
                    {username ? (
                        <>
                            <Link
                                href="/user"
                                className="flex items-center space-x-2"
                            >
                                <FaUser />
                                {<span>{username}님 안녕하세요!</span>}
                            </Link>
                            <button
                                onClick={() => logoutHeader()}
                                className="px-2"
                            >
                                로그아웃
                            </button>
                            <CiLogout />
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center space-x-2"
                        >
                            <FaUser />
                            <span>login</span>
                        </Link>
                    )}
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
                            모든 상품
                        </Link>
                        <Link
                            href="/about"
                            className="hover:text-gray-800 transition duration-300"
                        >
                            자주 묻는 질문
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
