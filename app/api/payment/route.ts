import { getCart, saveCart } from "@/app/lib/cache/data";
import { Cart } from "@/app/lib/types/definition";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId, items }: {userId: string, items: string[]} = await req.json();
    const cart: Cart = await getCart(userId);
    cart.items = cart.items.filter((item) => !items.includes(item.id));
    await saveCart(userId, cart);
    return NextResponse.json({success:true});
}
