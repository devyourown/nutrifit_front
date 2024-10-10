import { fetchProductById } from "@/app/lib/api/product";
import { getCart, saveCart } from "@/app/lib/cache/data";
import { makeEmptyCart } from "@/app/lib/generator";
import { Cart, CartItem, ProductDto } from "@/app/lib/types/definition";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { productId, userId, price, description } = await req.json();
    let cart: Cart = await getCart(userId);
    if (cart === null) {
        cart = makeEmptyCart();
    }
    const item = cart.items.find(item => item.name === description);
    if (item) {
        item.quantity += 1;
    } else {
        // 카트에 없는 경우, 상품을 추가합니다.
        const product: ProductDto = await fetchProductById(productId);
        const cartItem: CartItem = {
            id: product.id,
            name: description,
            price: price,
            quantity: 1,
            imageUrl: product.imageUrls[0],
            productId: productId
        }
        cart.items.push({ ...cartItem });
    }
    
    // 카트를 저장합니다.
    await saveCart(userId, cart);
    
    // 상태 코드와 함께 응답을 반환합니다.
    return NextResponse.json({ success: true }, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const { userId, description, quantity } = await req.json();
    let cart: Cart = await getCart(userId);
    const item = cart.items.find(item => item.name === description);
    if (!item)
        return NextResponse.json({success:false});
    item.quantity = quantity;
     // 카트를 저장합니다.
     await saveCart(userId, cart);
    
     // 상태 코드와 함께 응답을 반환합니다.
     return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
    const { userId, description } = await req.json();
    const cart: Cart = await getCart(userId);
    cart.items = cart.items.filter(item => item.name !== description);
    await saveCart(userId, cart);
    return NextResponse.json({ success: true}, {status: 203});
}