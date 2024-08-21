import { axiosInstance } from './data';

// 모든 제품을 가져오는 함수
export async function fetchAllProducts() {
    try {
        const response = (await axiosInstance.get('/products'));
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch products: ', error);
        throw error;
    }
}

// 특정 제품 ID로 제품을 가져오는 함수
export async function fetchProductById(productId: number) {
    try {
        const response = await axiosInstance.get(`/products/${productId}`);
        return response.data;
    } catch (error: any) {
        console.error(`Failed to fetch product with ID ${productId}: `, error);
        throw error;
    }
}

// 특정 카테고리로 제품을 가져오는 함수
export async function fetchProductsByCategory(category: string) {
    try {
        const response = await axiosInstance.get(`/products/category/${category}`);
        return response.data;
    } catch (error: any) {
        console.error(`Failed to fetch products for category ${category}: `, error);
        throw error;
    }
}

// 관리자 전용 - 새로운 제품을 추가하는 함수
export async function addProduct(productData: any, token: string) {
    try {
        const response = await axiosInstance.post('/products/admin', productData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to add product: ', error);
        throw error;
    }
}

// 관리자 전용 - 기존 제품을 업데이트하는 함수
export async function updateProduct(productData: any, token: string) {
    try {
        const response = await axiosInstance.put('/products/admin', productData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to update product: ', error);
        throw error;
    }
}

// 관리자 전용 - 제품을 삭제하는 함수
export async function deleteProduct(productId: number, token: string) {
    try {
        const response = await axiosInstance.delete(`/products/admin/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error(`Failed to delete product with ID ${productId}: `, error);
        throw error;
    }
}
