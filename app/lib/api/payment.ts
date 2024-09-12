import { PaymentDto } from "../types/definition";

export async function checkPayment(paymentDto: PaymentDto, token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderId:paymentDto.orderId,
            total: paymentDto.total,
            subtotal: paymentDto.subtotal,
            discount: paymentDto.discount,
            shippingFee: paymentDto.shippingFee,
            paymentMethod: paymentDto.paymentMethod,
            paymentId: paymentDto.paymentId,
            orderItems: paymentDto.orderItems,
            ordererDto: paymentDto.ordererDto,
            couponId: paymentDto.couponId,
            usedPoints: paymentDto.usedPoints 
        }),
    });
    if (response.ok) {
        return true;
    }
    return false;
}

export async function checkPaymentWithoutMember(paymentDto: PaymentDto, phone: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/nonmember`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderId:paymentDto.orderId,
            total: paymentDto.total,
            subtotal: paymentDto.subtotal,
            discount: paymentDto.discount,
            shippingFee: paymentDto.shippingFee,
            paymentMethod: paymentDto.paymentMethod,
            paymentId: paymentDto.paymentId,
            orderItems: paymentDto.orderItems,
            ordererDto: paymentDto.ordererDto,
            couponId: paymentDto.couponId,
            usedPoints: paymentDto.usedPoints,
            phoneNumber: phone
        }),
    });
    if (response.ok) {
        return true;
    }
    return false;
}

export async function completePayment(items: number[]) {
    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId, items, token})
    });
    const result = await response.json();
    return result;
}

export async function fetchPaymentById(id: string) {
    const token = localStorage.getItem('jwt');
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.ok) {
        return await response.json();
    }
    return null;
}