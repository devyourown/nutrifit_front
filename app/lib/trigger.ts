import { removeItemFromCart, updateCartItemQuantity } from "./api/cart";
import { CartItem, Checkout, Order, Orderer } from "./types/definition";

export function triggerCartOpen() {
    const updateEvent = new CustomEvent("cartUpdated");
    const openEvent = new CustomEvent('cartOpen');
    window.dispatchEvent(updateEvent);
    window.dispatchEvent(openEvent);
}

export const handleQuantityChange = async (id:number, description: string, quantity: number, setCartItems: (value: React.SetStateAction<CartItem[]>) => void) => {
    setCartItems((prevItems) =>
        prevItems.map((item) =>
            item.name === description ? { ...item, quantity } : item
        )
    );
    const userId = localStorage.getItem('id');
    await changeItemQuantity(userId!, description, quantity);
    const token = localStorage.getItem('jwt');
    if (token) {
        updateCartItemQuantity(token, id, quantity);
    }
    const updateEvent = new CustomEvent("cartUpdated");
    window.dispatchEvent(updateEvent);
};

export const handleRemoveItem = async (id: number, description: string, setCartItems:(value: React.SetStateAction<CartItem[]>) => void) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== description));
    const userId = localStorage.getItem('id');
    await deleteItem(userId!, description);
    const token = localStorage.getItem('jwt');
    if (token) {
        removeItemFromCart(token, id);
    }
    const updateEvent = new CustomEvent("cartUpdated");
    window.dispatchEvent(updateEvent);
};

export async function putItemInCart(userId: string, productId: number, price: number, description: string) {
    const response = await fetch('/api/cart/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, productId, price: price, description: description}),
    });
    return response;
}


export async function changeItemQuantity(userId: string, description: string, quantity: number) {
    const response = await fetch('/api/cart/product', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, quantity: quantity, userId: userId}),
    });
    return response;
}

export async function deleteItem(userId: string, description: string) {
    const response = await fetch('/api/cart/product', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, userId: userId}),
    });
    return response;
}

export async function makeCheckout(userId: string, order: Order, items: CartItem[]) {
    const checkout: Checkout = {items, order, step:1};
    const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checkout, id:userId}),
    });
    return response;
}

export async function addOrdererToCheckout(userId: string, orderer: Orderer) {
    const response = await fetch('/api/checkout/orderer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, orderer}),
    });
    return response;
}

export async function changeCheckoutStep(userId: string, step: number) {
    const response = await fetch('/api/checkout/step', {
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