export async function fetchUserOrders(token: string, page: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders?page=${page}&pageSize=5`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        return await response.json();
    } catch (error: any) {
        console.error('주문을 가져오는데 실패했습니다.', error.response.data);
        throw error;
    }
};

export async function fetchNonMemberOrder(paymentId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${paymentId}`);
        return await response.json();
    } catch (error: any) {
        console.error('주문을 가져오는데 실패했습니다.', error.response.data);
        throw error;
    }
}