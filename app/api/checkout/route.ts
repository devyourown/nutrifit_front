import { fetchUserCoupon } from "@/app/lib/api/coupon";
import { fetchUserPoint } from "@/app/lib/api/point";
import { getUserOrderer } from "@/app/lib/api/user";
import { getCheckout, saveCheckout } from "@/app/lib/cache/data";
import { Checkout } from "@/app/lib/types/definition";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const jwt = searchParams.get('jwt');
    
    if (!id) {
        return NextResponse.json({error: "Missing key parameter"}, {status: 400});
    }
    const checkout = await getCheckout(id); 
    if (jwt) {
        const coupons = await fetchUserCoupon(jwt);
        const points = await fetchUserPoint(jwt);
        checkout.order.availableCoupons = coupons;
        checkout.order.availablePoints = points.points;
        const orderer = await getUserOrderer(jwt);
        if (orderer) {
            checkout.orderer = orderer;
            checkout.step += 1;
        }
    }
    return NextResponse.json(checkout);
}

export async function PUT(req: NextRequest) {
    const { usedCoupon, usedPoints, totalAfterDiscount, id } = await req.json();
    const existed: Checkout = await getCheckout(id);
    if (existed.order) {
        existed.order.usedCouponCode = usedCoupon;
        existed.order.usedPoints = usedPoints;
        existed.order.total = Math.max(existed.order.total - totalAfterDiscount, 0);;
    }
    await saveCheckout(id, existed);
    return NextResponse.json({status: 200});
}

export async function POST(req: NextRequest) {
    const { checkout, id } = await req.json();
    const existed: Checkout  = await getCheckout(id);
    if (existed) {
        existed.items = checkout.items;
        existed.order = checkout.order;
        await saveCheckout(id, existed);
    } else {
        await saveCheckout(id, checkout);
    }
    return NextResponse.json({status: 200});
}