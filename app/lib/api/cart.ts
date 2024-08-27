// 장바구니에 아이템 추가
export async function addItemToCart(token: string, productId: number, quantity: number) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/cart/items`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({productId, quantity})
        })
        return await response.json();
    } catch (error: any) {
        console.error('Failed to get cart items:', error.response.data);
        throw error;
    }
};

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
        console.error('Failed to get cart items:', error.response.data);
        throw error;
    }
};

// 장바구니 아이템 수량 업데이트
export async function updateCartItemQuantity(token: string, productId: number, quantity: number) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/cart/items`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({productId, quantity})
        })
        return await response.json();
    } catch (error: any) {
        console.error('Failed to get cart items:', error.response.data);
        throw error;
    }
};

// 장바구니에서 아이템 제거
export async function removeItemFromCart(token: string, productId: number) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/cart/items/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        return await response.json();
    } catch (error: any) {
        console.error('Failed to get cart items:', error.response.data);
        throw error;
    }
};

// 장바구니 비우기
export async function clearCart(token: string) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/cart/items`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        return await response.json();
    } catch (error: any) {
        console.error('Failed to get cart items:', error.response.data);
        throw error;
    }
};
