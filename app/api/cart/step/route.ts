import { getCart, saveCart } from "@/app/lib/cache/data";
import { Cart } from "@/app/lib/types/definition";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const { userId, checkoutStep } = await req.json();
    const cart: Cart = await getCart(userId);
    if (cart === null) {
        return NextResponse.json({success:false}, {status:403});
    }
    cart.checkoutStep = checkoutStep;
    await saveCart(userId, cart);
    return NextResponse.json({success: true}, {status: 200});
}
