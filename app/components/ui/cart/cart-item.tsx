// components/CartItem.tsx

import React from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CartItem as Item} from "@/app/lib/types/definition";
import { handleQuantityChange, handleRemoveItem } from "@/app/lib/trigger";

type CartItemProps = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    options?: string;
    setCartItems: (value: React.SetStateAction<Item[]>) => void
};

export default function CartItem({
    id,
    name,
    imageUrl,
    price,
    quantity,
    options,
    setCartItems
}: CartItemProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleQuantityChange(id, name, parseInt(e.target.value), setCartItems);
    };

    return (
        <div className="flex items-center justify-between border-b py-4">
            <div className="flex items-center">
                <Image
                    src={imageUrl}
                    alt={name}
                    width={80}
                    height={80}
                    className="rounded-md"
                />
                <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        {name}
                    </h3>
                    {options && (
                        <p className="text-sm text-gray-500">{options}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                        상품 가격: ₩{price.toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="flex items-center">
                <select
                    value={quantity}
                    onChange={handleChange}
                    className="mr-4 border border-gray-300 rounded-md text-gray-700"
                >
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
                <p className="text-lg font-semibold text-gray-900">
                    ₩{(price * quantity).toLocaleString()}
                </p>
                <button
                    onClick={() => handleRemoveItem(id, name, setCartItems)}
                    className="ml-4 text-gray-500 hover:text-red-500"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};
