import { Order } from "./types/definition";

export function triggerCartOpen() {
    const event = new CustomEvent("cartUpdated");
    window.dispatchEvent(event);
}

export async function changeItemQuantity(userId: string, productId: string, quantity: number) {
    const response = await fetch('/api/cart/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: quantity, userId: userId}),
    });
    return response;
}

export async function addOrderToCart(userId: string, order: Order) {
    const response = await fetch('/api/cart/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order, userId}),
    });
    return response;
}