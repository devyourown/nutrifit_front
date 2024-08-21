import { axiosInstance, setAuthToken } from "./data";


// 장바구니에 아이템 추가
export async function addItemToCart(token: string, productId: number, quantity: number) {
    try {
        setAuthToken(token);
        const response = await axiosInstance.post('/items', {
            productId,
            quantity
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to add item to cart:', error.response.data);
        throw error;
    }
};

// 장바구니 아이템 조회
export async function getCartItems(token: string) {
    try {
        setAuthToken(token);
        const response = await axiosInstance.get('/items');
        return response.data;
    } catch (error: any) {
        console.error('Failed to get cart items:', error.response.data);
        throw error;
    }
};

// 장바구니 아이템 수량 업데이트
export async function updateCartItemQuantity(token: string, productId: number, quantity: number) {
    try {
        setAuthToken(token);
        const response = await axiosInstance.put('/items', {
            productId,
            quantity
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to update cart item quantity:', error.response.data);
        throw error;
    }
};

// 장바구니에서 아이템 제거
export async function removeItemFromCart(token: string, productId: number) {
    try {
        setAuthToken(token);
        const response = await axiosInstance.delete(`/items/${productId}`);
        return response.data;
    } catch (error: any) {
        console.error('Failed to remove item from cart:', error.response.data);
        throw error;
    }
};

// 장바구니 비우기
export async function clearCart(token: string) {
    try {
        setAuthToken(token);
        const response = await axiosInstance.delete('/items');
        return response.data;
    } catch (error: any) {
        console.error('Failed to clear cart:', error.response.data);
        throw error;
    }
};
