import { updateCart } from "@/app/lib/api/cart";
import { clearCart, getCart } from "@/app/lib/cache/data";
import { Cart } from "@/app/lib/types/definition";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId, jwt } = await req.json();
    const cart: Cart  = await getCart(userId);
    await clearCart(userId);
    const data = await updateCart(jwt, cart ? cart.items : []);
    if (data.ok) {
        return NextResponse.json({status: 200});
    }
    return NextResponse.json({status: 403});
}