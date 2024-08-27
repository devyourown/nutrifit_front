import { getCart } from "@/app/lib/cache/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
        return NextResponse.json({error: "Missing key parameter"}, {status: 400});
    } 
    const cart = await getCart(id);
    return NextResponse.json(cart);
}
