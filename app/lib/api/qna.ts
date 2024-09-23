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

export async function fetchUserQna(token: string, page: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/qna/user?page=${page}&size=5`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (e) {
        console.error('Failed to fetch qnas : ', e);
    }
}

export async function deleteUserQna(token: string, id: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/qna/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return await response.text();
    } catch (e) {
        console.error('Failed to delete qna : ', e);
    }
}