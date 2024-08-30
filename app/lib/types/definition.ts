export type ProductDto = {
    id: number;
    name: string;
    description?: string;
    category?: string;
    imageUrls: string[];
    stockQuantity?: number;
    lowStockThreshold?: number;
    badgeTexts?: string[];
    originalPrice: number;
    discountedPrice: number;
    reviewRating: number;
    reviewCount: number;
    options?: Option[];
};

export type Option = {
    price: number;
    quantity: number;
    description: string;
};

export type OrderItemDto = {
    productId: number;
    quantity: number;
    price: number;
    name: string;
    imageUrl: string;
};

export type OrderDto = {
    id: number;
    orderDate: string;
    totalAmount: number;
    orderItems: OrderItemDto[];
    status: string;
};

export type PaymentDto = {
    orderId: string;
    subtotal: number;
    discount: number;
    shippingFee: number;
    total: number;
    paymentMethod: string;
    paymentId: string;
    orderItems: CartItemDto[];
    ordererDto: Orderer;
    paymentDate?: string;
    couponId?: number;
    usedPoints?: number;
};

export type ShippingDto = {
    id: number;
    orderId: number;
    recipientName: string;
    address: string;
    phoneNumber: string;
    currentStatus: ShippingStatus;
};

export type ShippingStatusDto = {
    shippingId: number;
    status: ShippingStatus;
    time: string;
};

type ShippingStatus =
    | "ORDERED"
    | "PENDING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELED"
    | "REFUNDED";

export type SignDto = {
    username: string;
    email: string;
    password: string;
};

export type UserDto = {
    id: string;
    email: string;
    username: string;
    token: string;
    role: "USER" | "ADMIN";
};

export type CartItemDto = {
    id: string;
    name: string;
    description?: string;
    price: number;
    imageUrl: string;
    quantity: number;
};

export type CouponDto = {
    code: string;
    description: string;
    discountValue: number;
    discountType: "PERCENTAGE" | "AMOUNT";
    validFrom: string;
    validUntil: string;
    minimumOrderAmount: number;
    maxDiscountAmount: number;
    remainingQuantity: number;
};

export type ReviewDto = {
    id: number;
    productId: number;
    username: string;
    rating: number;
    comment: string;
    createdAt: string;
};

export type Cart = {
    items: CartItem[];
    checkoutStep: number;
    orderer?: Orderer;
    payment?: {
        method: string;
        cardNumber: string;
    };
    order?: Order;
};

export type Checkout = {
    items: CartItem[];
    step: number;
    orderer?: Orderer;
    order?: Order;
}

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
};

export type Order = {
    id: string;
    subtotal: number;
    shipping: number;
    total: number;
};

export type Orderer = {
    ordererName: string;
    ordererPhone: string;
    recipientName: string;
    recipientPhone: string;
    address: string;
    addressDetail: string;
    cautions: string;
};

export type PointDto = {
    points: number;
    transactions: PointTransactionDto[]
}

export type PointTransactionDto = {
    type: "REWARD" | "USE" | "BURN";
    description: string;
    whenToBurn: string;
    point: number;
}