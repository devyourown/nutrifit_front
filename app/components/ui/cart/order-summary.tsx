// components/OrderSummary.tsx

import Link from "next/link";
import React from "react";

type OrderSummaryProps = {
    subtotal: number;
    shipping?: number;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
    subtotal,
    shipping = 0,
}) => {
    const total = subtotal + shipping;

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
                <Link href="/checkout">
                    <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors">
                        결제하기
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default OrderSummary;
