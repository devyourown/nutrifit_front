"use client";

import { useEffect, useState } from "react";
import Checkout from "../components/ui/checkout/checkout";
import { Cart, CartItem } from "../lib/types/definition";

export default function Page() {
    const [cart, setCart] = useState<Cart>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const setCartWithId = async () => {
            const userId = localStorage.getItem("id");
            const response = await fetch(`/api/cart?id=${userId}`);
            const cartData: Cart = await response.json();
            setCart(cartData);
            setLoading(false);
        };
        setCartWithId();
    }, []);

    return loading ? <p>로딩 중...</p> : <Checkout cart={cart!} />;
}
