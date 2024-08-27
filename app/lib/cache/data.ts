import { createClient } from "redis";
import { Cart } from "../types/definition";

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


export function makeEmptyCart(): Cart {
    return {
        items: [],
        checkoutStep: 1,
    }
}