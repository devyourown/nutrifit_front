import {getCheckout, saveCheckout } from "@/app/lib/cache/data";
import { Checkout } from "@/app/lib/types/definition";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { orderer, userId } = await req.json();
    const checkout: Checkout = await getCheckout(userId);
    if (checkout === null) {
        return NextResponse.json({success:false}, {status:403});
    }
    checkout.orderer = orderer;
    checkout.step += 1;
    await saveCheckout(userId, checkout);
    
    // 상태 코드와 함께 응답을 반환합니다.
    return NextResponse.json({ success: true }, { status: 201 });
}