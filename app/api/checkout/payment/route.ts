import { getCart, getCheckout, saveCart, saveCheckout } from "@/app/lib/cache/data";
import { Cart, Checkout } from "@/app/lib/types/definition";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { payment, userId } = await req.json();
    const checkout: Checkout = await getCheckout(userId);
    if (checkout === null) {
        return NextResponse.json({success:false}, {status:403});
    }
    checkout.payment = payment;
    await saveCheckout(userId, checkout);
    
    // 상태 코드와 함께 응답을 반환합니다.
    return NextResponse.json({ success: true }, { status: 201 });
}