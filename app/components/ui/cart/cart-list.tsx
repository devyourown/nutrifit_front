import React from "react";
import CartItem from "./cart-item";
import { CartItem as Item } from "@/app/lib/types/definition";


type CartListProps = {
    items: Item[];
    setCartItems: (value: React.SetStateAction<Item[]>) => void
};

export default function CartList({
    items,
    setCartItems
}: CartListProps) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            {items.length === 0 ? (
                <p className="text-gray-500">이런! 카트가 비었어요</p>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <CartItem
                            key={item.name}
                            {...item}
                            setCartItems={setCartItems}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};