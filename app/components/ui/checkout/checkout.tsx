"use client";

import { Cart } from "@/app/types/definition";
import React, { useState } from "react";
import CheckoutSummary from "./checkout-summary";
import CustomerDetails from "./customer-details";
import Payment from "./payment";

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
        subtotal: 400,
        delivery: 2500,
        vat: 0,
        total: 2900,
    },
};

const Checkout: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-1/2">
                    <CustomerDetails />
                    <Payment />
                </div>
                <div className="w-full md:w-1/2">
                    <CheckoutSummary />
                </div>
            </div>
        </div>
    );
};

export default Checkout;
