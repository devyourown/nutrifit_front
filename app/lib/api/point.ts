export async function fetchUserPoint(token: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/point`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        return await response.json();
    } catch (error: any) {
        console.error('포인트를 가져오는데 실패했습니다.', error.response.data);
        throw error;
    }
};