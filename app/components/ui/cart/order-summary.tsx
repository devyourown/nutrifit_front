// components/OrderSummary.tsx

import React from "react";

type OrderSummaryProps = {
    subtotal: number;
    shipping?: number;
    onCheckout: () => void;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
    subtotal,
    shipping = 0,
    onCheckout,
}) => {
    const total = subtotal + shipping;

    return (
        <div className="bg-gray-50 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Order Summary
            </h2>
            <div className="space-y-4">
                <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₩{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>₩{shipping.toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between text-gray-900 font-semibold">
                    <span>Total</span>
                    <span>₩{total.toLocaleString()}</span>
                </div>
                <button
                    onClick={onCheckout}
                    className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default OrderSummary;
