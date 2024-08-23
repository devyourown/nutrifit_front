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
    totalAmount: number;
    name: string;
    imageUrl: string;
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
    orderItems: OrderDto[];
    shippingDto: ShippingDto;
    paymentDate: String;
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
    name: string;
    description: string;
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
    address?: {
        recipientName: string;
        address: string;
        postalCode: string;
        phoneNumber: string;
    };
    payment?: {
        method: string;
        cardNumber: string;
    };
    order?: {
        subtotal: number;
        delivery: number;
        vat: number;
        total: number;
    };
};

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
};
