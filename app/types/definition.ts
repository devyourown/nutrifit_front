export type ProductDto = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stockQuantity: number;
};

export type OrderItemDto = {
    productId: number;
    quantity: number;
    totalAmount: number;
};

export type OrderDto = {
    id: number;
    orderDate: string;
    totalAmount: number;
    orderItems: OrderItemDto[];
};

export type PaymentDto = {
    orderId: number;
    amount: number;
    paymentMethod: string;
    impUid: string;
    merchantUid?: string;
    orderItems: OrderDto[];
    shippingDto: ShippingDto;
    couponId?: number;
    usedPoints?: number;
};

export type ShippingDto = {
    recipientName: string;
    address: string;
    phoneNumber: string;
};

export type SignDto = {
    id: number;
    username: string;
    email: string;
    password: string;
    role: "USER" | "ADMIN";
};
