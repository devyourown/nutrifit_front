export async function makeQnA(token: string, productId: number, question: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/qna`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: productId,
                question: question
            })
        });
        return response;
    } catch (e) {
        console.error('Failed to make qna : ', e);
    }
}