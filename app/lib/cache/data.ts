import { Cart } from "@/app/types/definition";
import { cookies } from "next/headers";
import { createClient } from "redis";
import { v4 as uuidv4 } from 'uuid';

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});

redisClient.on("error", (err: any) => console.error(err));

if (!redisClient.isOpen) redisClient.connect();

function generateUniqueId() {
    return uuidv4();
}

function setUserCookie() {
    const userId = generateUniqueId();
    return cookies().set('user_id', userId, {expires: 30});
}

function getUserIdFromCookie(): string {
    if (cookies().get('user_id') === null) {
        setUserCookie();
    }
    return cookies().get('user_id')?.value!;
}

export async function saveCart(cart: Cart) {
    await redisClient.hSet(
        "cart",
        getUserIdFromCookie(),
        JSON.stringify(cart));
}

export async function getCart() {
    try {
        const cart = await redisClient.hGet('cart',
            getUserIdFromCookie()
        );
        if (cart === null) return makeEmptyCart();
        return JSON.parse(cart!);
    } catch (error) {
        console.error('Getting cart error: ', error);
        return null;
    }
}

function makeEmptyCart(): Cart {
    return {
        items: [],
        checkoutStep: 1,
    }
}