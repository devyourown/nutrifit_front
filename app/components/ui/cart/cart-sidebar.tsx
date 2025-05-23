import React, { useState } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { CartItem } from "@/app/lib/types/definition";
import { handleQuantityChange, handleRemoveItem } from "@/app/lib/trigger";


type CartSidebarProps = {
    items: CartItem[];
    isOpen: boolean;
    onClose: () => void;
    setCartItems: (value: React.SetStateAction<CartItem[]>) => void;
};

export default function CartSidebar({
    items,
    isOpen,
    onClose,
    setCartItems
}: CartSidebarProps) {
    const calculateSubtotal = () => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    return (
        <Transition show={isOpen} as={React.Fragment}>
            <div
                className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"
                onClick={onClose}
            ></div>
            <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl z-50">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">장바구니</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    {items.map((item) => (
                        <div key={item.name} className="flex items-center border-b pb-4">
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                width={50}
                                height={50}
                                className="object-cover rounded"
                            />
                            <div className="ml-4 flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                <h3 className="text-sm font-medium">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {item.price.toLocaleString("ko-KR")}원
                                </p>
                                </div>
                                <button
                                        onClick={() => handleRemoveItem(item.id, item.name, setCartItems)}
                                        className="text-gray-500 hover:text-red-500"
                                    >
                                        &times;
                                    </button>
                                </div>
                                <div className="flex items-center mt-2">
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.id,
                                                item.name,
                                                Math.max(1, item.quantity - 1),
                                                setCartItems
                                            )
                                        }
                                        className="p-1 border border-gray-300 text-gray-600"
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.id,
                                                item.name,
                                                item.quantity + 1,
                                                setCartItems
                                            )
                                        }
                                        className="p-1 border border-gray-300 text-gray-600"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t">
                    <div className="flex justify-between text-sm font-medium">
                        <span>총 상품 비용</span>
                        <span>{calculateSubtotal().toLocaleString("ko-KR")}원</span>
                    </div>
                    <Link href="/cart">
                    <button
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
                        onClick={onClose}
                    >
                        장바구니 보기
                    </button>
                    </Link>
                </div>
            </div>
        </Transition>
    );
}
