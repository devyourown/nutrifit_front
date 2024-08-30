import { createClient } from "redis";
import { Cart, CartItem, Checkout } from "../types/definition";

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});

redisClient.on("error", (err: any) => console.error(err));

if (!redisClient.isOpen) redisClient.connect();


export async function saveCart(id: string, cart: Cart) {
    await redisClient.hSet(
        "cart",
        id,
        JSON.stringify(cart));
}

export async function getCart(id: string) {
    try {
        const cart = await redisClient.hGet('cart',
            id
        );
        if (cart === null) return null;
        return JSON.parse(cart!);
    } catch (error) {
        console.error('Getting cart error: ', error);
        return null;
    }
}

export async function clearCacheCart(id: string, items: CartItem[]) {
    try {
        await redisClient.hDel('cart', id);
    } catch (error) {
        console.error('failed to clear cart.');
    }
}

export async function saveCheckout(id: string, checkout: Checkout) {
    console.log(checkout);
    await redisClient.hSet(
        "checkout",
        id,
        JSON.stringify(checkout)
    );
}

export async function getCheckout(id: string) {
    try {
        const checkout = await redisClient.hGet('checkout',
            id
        );
        if (checkout === null) return null;
        return JSON.parse(checkout!);
    } catch (error) {
        console.error('Getting checkout error: ', error);
        return null;
    }
}