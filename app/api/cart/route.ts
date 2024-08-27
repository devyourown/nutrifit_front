import { getCartItems } from "@/app/lib/api/cart";
import { getUserOrderer } from "@/app/lib/api/user";
import { getCart, saveCart } from "@/app/lib/cache/data";
import { makeEmptyCart } from "@/app/lib/generator";
import { Cart, CartItem, CartItemDto, Orderer } from "@/app/lib/types/definition";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
        return NextResponse.json({error: "Missing key parameter"}, {status: 400});
    } 
    let cart = await getCart(id);
    if (cart === null) {
       cart = makeEmptyCart(); 
    }
    return NextResponse.json(cart);
}

function convertDtoToCartItem(dto: CartItemDto): CartItem {
    return {
        id: dto.id,
        name: dto.name,
        price: dto.price,
        imageUrl: dto.imageUrl,
        quantity: dto.quantity,
    }
}

export async function PUT(req: NextRequest) {
    const { userId, jwt } = await req.json();
    const dbItems: CartItemDto[] = await getCartItems(jwt);
    const userOrderer: Orderer = await getUserOrderer(jwt);
    const cart: Cart = await getCart(userId);
    if (cart === null) {
        return NextResponse.json({success:false}, {status:403});
    }
    if (userOrderer !== null) {
        cart.orderer = userOrderer;
        cart.checkoutStep = 2;
    }
    if (dbItems) {
        const newItems = dbItems.map(convertDtoToCartItem);
        cart.items = [...cart.items, ...newItems];
    }
    await saveCart(userId, cart);
    return NextResponse.json({success: true}, {status: 200});
}
