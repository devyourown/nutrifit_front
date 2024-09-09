import { fetchProductById } from "@/app/lib/api/product";
import { getCart, saveCart } from "@/app/lib/cache/data";
import { makeEmptyCart } from "@/app/lib/generator";
import { Cart, CartItem, ProductDto } from "@/app/lib/types/definition";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { productId, quantity, userId } = await req.json();
    let cart: Cart = await getCart(userId);
    if (cart === null) {
        cart = makeEmptyCart();
    }
    const item = cart.items.find(item => item.id === productId);
    if (item) {
        // 이미 카트에 있는 경우, 수량을 증가시킵니다.
        if (quantity !== 1) {
            item.quantity = quantity;
        }
        cart.items = cart.items.filter(item => item.quantity > 0);
    } else {
        // 카트에 없는 경우, 상품을 추가합니다.
        const product: ProductDto = await fetchProductById(productId);
        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.discountedPrice,
            quantity: quantity,
            imageUrl: product.imageUrls[0],
        }
        cart.items.push({ ...cartItem });
    }
    
    // 카트를 저장합니다.
    await saveCart(userId, cart);
    
    // 상태 코드와 함께 응답을 반환합니다.
    return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
    const { userId, productId } = await req.json();
    const cart: Cart = await getCart(userId);
    cart.items = cart.items.filter(item => item.id !== productId);
    await saveCart(userId, cart);
    return NextResponse.json({ success: true}, {status: 203});
}