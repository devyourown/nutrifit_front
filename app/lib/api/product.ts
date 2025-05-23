export async function fetchReleasedProducts(page: number) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/released?page=${page}&size=6`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return await response.json();
    } catch (error: any) {
        console.error("Failed to fetch products: ", error);
        throw error;
    }
}

// 특정 제품 ID로 제품을 가져오는 함수
export async function fetchProductById(productId: number) {
    try {
        const response = await fetch(
            `${process.env.BACKEND_URL}/products/${productId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return await response.json();
    } catch (error: any) {
        console.error(`Failed to fetch product with ID ${productId}: `, error);
        throw error;
    }
}

// 특정 카테고리로 제품을 가져오는 함수
export async function fetchProductsByCategory(category: string, page: number) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/category/${category}?page=${page}&size=6`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return await response.json();
    } catch (error: any) {
        console.error(
            `Failed to fetch products for category ${category}: `,
            error
        );
        throw error;
    }
}

// 관리자 전용 - 새로운 제품을 추가하는 함수
export async function addProduct(productData: any, token: string) {
    try {
        const response = await fetch(
            `${process.env.BACKEND_URL}/products/admin`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            }
        );
        return await response.json();
    } catch (error: any) {
        console.error("Failed to add product: ", error);
        throw error;
    }
}

// 관리자 전용 - 기존 제품을 업데이트하는 함수
export async function updateProduct(productData: any, token: string) {
    try {
        const response = await fetch(
            `${process.env.BACKEND_URL}/products/admin`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            }
        );
        return await response.json();
    } catch (error: any) {
        console.error("Failed to update product: ", error);
        throw error;
    }
}

// 관리자 전용 - 제품을 삭제하는 함수
export async function deleteProduct(productId: number, token: string) {
    try {
        const response = await fetch(
            `${process.env.BACKEND_URL}/products/admin/${productId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return await response.json();
    } catch (error: any) {
        console.error(`Failed to delete product with ID ${productId}: `, error);
        throw error;
    }
}
