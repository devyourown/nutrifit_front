import { generateUniqueId } from "@/app/lib/generator";
import { makeCheckout } from "@/app/lib/trigger";
import { CartItem, Order } from "@/app/lib/types/definition";
import { useRouter } from "next/navigation";
import React from "react";

type OrderSummaryProps = {
    items: CartItem[];
    subtotal: number;
    shipping?: number;
};

export default function OrderSummary({
    items,
    subtotal,
    shipping = 0
}: OrderSummaryProps) {
    const router = useRouter();
    const total = subtotal + shipping;

    const addOrder = async (subtotal: number, shipping: number, total: number) => {
        const userId = localStorage.getItem('id');
        if (!userId) {
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
            router.push('/');
            return;
        }
        const orderId = 'order-'+generateUniqueId();
        const order: Order = {id: orderId, subtotal, shipping, total, availableCoupons: [], availablePoints: 0, usedCouponCode: '', usedPoints: 0};
        const response = await makeCheckout(userId, order, items);
        if (!response.ok) {
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
            router.push('/');
            return;
        }
        router.push('/checkout')
    }

    return (
        <div className="bg-gray-50 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                주문 요약
            </h2>
            <div className="space-y-4">
                <div className="flex justify-between text-gray-700">
                    <span>상품</span>
                    <span>₩{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span>배송비</span>
                    <span>₩{shipping.toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between text-gray-900 font-semibold">
                    <span>총 비용</span>
                    <span>₩{total.toLocaleString()}</span>
                </div>
                    <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
                    onClick={() => addOrder(subtotal, shipping, total)}>
                        결제하기
                    </button>
            </div>
        </div>
    );
};
