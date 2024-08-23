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
    console.log(response);
    throw new Error(`Unexpected response status: ${response.status}`);
}