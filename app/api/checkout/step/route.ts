import { getCart, getCheckout, saveCart, saveCheckout } from "@/app/lib/cache/data";
import { Cart, Checkout } from "@/app/lib/types/definition";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const { userId, checkoutStep } = await req.json();
    const checkout: Checkout = await getCheckout(userId);
    if (checkout === null) {
        return NextResponse.json({success:false}, {status:403});
    }
    checkout.step = checkoutStep;
    await saveCheckout(userId, checkout);
    return NextResponse.json({success: true}, {status: 200});
}
