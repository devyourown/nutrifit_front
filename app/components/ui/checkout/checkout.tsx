"use client";

import React, { useState } from "react";
import CheckoutSummary from "./checkout-summary";
import CustomerDetails from "./customer-details";
import Payment from "./payment";
import { Checkout as CheckoutType, Orderer } from "@/app/lib/types/definition";

interface CheckoutProps {
    checkout: CheckoutType;
}

export default function Checkout({ checkout }: CheckoutProps) {
    const [steps, setSteps] = useState(checkout.step);
    const [orderer, setOrderer] = useState<Orderer>(checkout.orderer!);
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-center mb-6">
                        결제
                    </h2>
                    <CustomerDetails
                        steps={steps}
                        orderer={orderer!}
                        setSteps={setSteps}
                        setOrderer={setOrderer}
                    />
                    <Payment
                        steps={steps}
                        order={checkout.order!}
                        items={checkout.items}
                        orderer={orderer!}
                    />
                </div>
                <div className="flex-shrink-0 w-full md:w-1/3">
                    <CheckoutSummary items={checkout.items} order={checkout.order!} />
                </div>
            </div>
        </div>
    );
}
