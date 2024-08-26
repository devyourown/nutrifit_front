"use client";


import { useEffect, useState } from "react";
import Cart from "../components/ui/cart/cart";
import { Cart as CartType, CartItem } from "../lib/types/definition";

export default function Page() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const setCart = async () => {
            const userId = localStorage.getItem('id');
            const response = await fetch(`/api/cart?id=${userId}`);
            const cart: CartType = await response.json();
            setCartItems(cart.items);
            setLoading(false);
        }
        setCart();
    }, []);

    return loading ? <p>로딩 중...</p> : <Cart items={cartItems}/>;
}
