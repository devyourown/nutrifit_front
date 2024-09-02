import { updateCart } from "@/app/lib/api/cart";
import { getCart, saveCart } from "@/app/lib/cache/data";
import { Cart } from "@/app/lib/types/definition";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId, items, token }: {userId: string, items: number[], token: string} = await req.json();
    const cart: Cart = await getCart(userId);
    cart.items = cart.items.filter((item) => !items.includes(item.id));
    if (token) {
        await updateCart(token, cart.items);
    }
    await saveCart(userId, cart);
    return NextResponse.json({success:true});
}
