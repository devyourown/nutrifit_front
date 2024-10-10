import { CartItemDto } from "../types/definition";

// 장바구니 아이템 조회
export async function getCartItems(token: string) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/cart/items`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        return await response.json();
    } catch (error: any) {
        console.error('Failed to get cart items:', error);
        throw error;
    }
};

export async function updateCart(token: string, items: CartItemDto[]) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/change`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(items)
        });
        return response;
    } catch (error: any) {
        console.error('Failed to update cart: ', error);
        throw error;
    }
}
