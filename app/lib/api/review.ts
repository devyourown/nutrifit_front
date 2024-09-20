export async function getProductReviews(productId: number, page: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/product/${productId}?page=${page}&size=60`);
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

export async function makeReview(token: string, productId: number, comment: string, imageUrls: string[], rating: number) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({productId, comment, imageUrls, rating}),
        });
        return response;
    } catch (e) {
        console.error('Failed to make reviews : ', e);
    }
}