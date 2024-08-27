import { fetchProductById } from "@/app/lib/api/product";
import { getCart, saveCart } from "@/app/lib/cache/data";
import { Cart, CartItem, ProductDto } from "@/app/lib/types/definition";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { productId, quantity, userId } = await req.json();
    const cart: Cart = await getCart(userId);
    const item = cart.items.find(item => item.id === productId.toString());
    if (item) {
        // 이미 카트에 있는 경우, 수량을 증가시킵니다.
        item.quantity += quantity;
        cart.items.filter(item => item.quantity > 0);
    } else {
        // 카트에 없는 경우, 상품을 추가합니다.
        const product: ProductDto = await fetchProductById(productId);
        const cartItem: CartItem = {
            id: product.id.toString(),
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