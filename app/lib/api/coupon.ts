export async function fetchUserCoupon(token: string, page: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon?page=${page}&size=10`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        return await response.json();
    } catch (error: any) {
        console.error('쿠폰을 가져오는데 실패했습니다.', error.response.data);
        throw error;
    }
};

export async function assignUserCoupon(token: string, code: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon/assign`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'text/plain',
            },
            body: code,
        });
        return response.text();
    } catch (error: any) {
        console.error('쿠폰을 만드는데 실패했습니다.', error);
        throw error;
    }
}