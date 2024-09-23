export async function existsByUsername(username: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.status === 200)
        return false;
    if (response.status === 409)
        return true;
    return false;
}

export async function getUserOrderer(token: string) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/auth/address`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (error) {
        return null;
    }
}