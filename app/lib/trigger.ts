import { Order, Orderer } from "./types/definition";

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

export async function deleteItem(userId: string, productId: string) {
    const response = await fetch('/api/cart/product', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, userId: userId}),
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

export async function addOrdererToCart(userId: string, orderer: Orderer) {
    const response = await fetch('/api/cart/orderer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, orderer}),
    });
    return response;
}

export async function changeCheckoutStep(userId: string, step: number) {
    const response = await fetch('/api/cart/step', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, checkoutStep: step}),
    });
    return response;
}

export async function initCartWithDB(userId: string, jwt: string) {
    const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, jwt})
    });
    return response;
}