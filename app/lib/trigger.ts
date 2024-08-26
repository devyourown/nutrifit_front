export function triggerCartOpen() {
    const event = new CustomEvent("cartUpdated");
    window.dispatchEvent(event);
}

export async function changeItemQuantity(userId: string, productId: string, quantity: number) {
    const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: quantity, userId: userId}), // userId는 실제 사용자 ID로 대체해야 합니다.
    });
    return response;
}