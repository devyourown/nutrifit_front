export async function getProductReviews(productId: number, page: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/product/${productId}?page=${page}&size=6`);
        return await response.json();
    } catch (e) {
        console.error('Failed to fetch reviews : ', e);
    }
}

export async function getUserReviews(token: string, page: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/user?page=${page}&size=6`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (e) {
        console.error('Failed to fetch reviews : ', e);
    }
}