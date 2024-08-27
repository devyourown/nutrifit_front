"use client";

import React, { useState } from "react";
import CheckoutSummary from "./checkout-summary";
import CustomerDetails from "./customer-details";
import Payment from "./payment";
import { Cart } from "@/app/lib/types/definition";

interface CheckoutProps {
    cart: Cart;
}

export default function Checkout({ cart }: CheckoutProps) {
    const [steps, setSteps] = useState(cart.checkoutStep);
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-center mb-6">
                        결제
                    </h2>
                    <CustomerDetails
                        steps={steps}
                        orderer={cart.orderer!}
                        setSteps={setSteps}
                    />
                    <Payment
                        steps={steps}
                        order={cart.order!}
                        items={cart.items}
                    />
                </div>
                <div className="flex-shrink-0 w-full md:w-1/3">
                    <CheckoutSummary items={cart.items} order={cart.order!} />
                </div>
            </div>
        </div>
    );
}
