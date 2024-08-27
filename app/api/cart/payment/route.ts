import { getCart, saveCart } from "@/app/lib/cache/data";
import { Cart } from "@/app/lib/types/definition";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { payment, userId } = await req.json();
    const cart: Cart = await getCart(userId);
    if (cart === null) {
        return NextResponse.json({success:false}, {status:403});
    }
    cart.payment = payment;
    await saveCart(userId, cart);
    
    // 상태 코드와 함께 응답을 반환합니다.
    return NextResponse.json({ success: true }, { status: 201 });
}