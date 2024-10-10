import { getCartItems } from "@/app/lib/api/cart";
import { getCart, saveCart } from "@/app/lib/cache/data";
import { makeEmptyCart } from "@/app/lib/generator";
import { Cart, CartItem, CartItemDto } from "@/app/lib/types/definition";
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
        productId: dto.productId
    }
}

export async function PUT(req: NextRequest) {
    const { userId, jwt } = await req.json();
    const dbItems: CartItemDto[] = await getCartItems(jwt);
    let cart: Cart = await getCart(userId);
    if (cart === null) {
        cart = makeEmptyCart();
    }
    if (dbItems) {
        const newItems = dbItems.map(convertDtoToCartItem);
        cart.items = [...cart.items, ...newItems];
    }
    await saveCart(userId, cart);
    return NextResponse.json({success: true}, {status: 200});
}
