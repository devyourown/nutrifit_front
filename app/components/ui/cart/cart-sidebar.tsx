import React, { useState } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import Link from "next/link";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

type CartSidebarProps = {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onQuantityChange: (itemId: number, quantity: number) => void;
};

export default function CartSidebar({
  items,
  isOpen,
  onClose,
  onQuantityChange,
}: CartSidebarProps) {
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl z-50">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        <div className="p-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={50}
                height={50}
                className="object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">€{item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                    className="p-1 border border-gray-300 text-gray-600"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => onQuantityChange(item.id, item.quantity + 1)}
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
            <span>Subtotal</span>
            <span>€{calculateSubtotal().toFixed(2)}</span>
          </div>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
            <Link href="/cart">View Cart</Link>
          </button>
        </div>
      </div>
    </Transition>
  );
};
