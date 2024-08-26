"use client";

import React, { useState } from "react";
import CheckoutSummary from "./checkout-summary";
import CustomerDetails from "./customer-details";
import Payment from "./payment";
import { Cart } from "@/app/lib/types/definition";

const initialCart: Cart = {
    items: [
        {
            id: "1",
            name: "Product 1",
            price: 100,
            quantity: 2,
            imageUrl: "/sample1.jfif",
        },
        {
            id: "2",
            name: "Product 2",
            price: 200,
            quantity: 1,
            imageUrl: "/sample1.jfif",
        },
    ],
    checkoutStep: 1,
    order: {
        id: "112321213213",
        subtotal: 400,
        delivery: 2500,
        vat: 0,
        total: 2900,
    },
};

export default function Checkout() {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-center mb-6">
                        결제
                    </h2>
                    <CustomerDetails
                        steps={initialCart.checkoutStep}
                        orderer={initialCart.orderer!}
                    />
                    <Payment
                        steps={initialCart.checkoutStep}
                        order={initialCart.order!}
                        items={initialCart.items}
                    />
                </div>
                <div className="flex-shrink-0 w-full md:w-1/3">
                    <CheckoutSummary
                        items={initialCart.items}
                        order={initialCart.order!}
                    />
                </div>
            </div>
        </div>
    );
}
