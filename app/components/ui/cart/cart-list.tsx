import React from "react";
import CartItem from "./cart-item";

export type CartItem = {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    options?: string;
};

type CartListProps = {
    items: CartItem[];
    onQuantityChange: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
};

const CartList: React.FC<CartListProps> = ({
    items,
    onQuantityChange,
    onRemove,
}) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                장바구니
            </h2>
            {items.length === 0 ? (
                <p className="text-gray-500">이런! 카트가 비었어요</p>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <CartItem
                            key={item.id}
                            {...item}
                            onQuantityChange={onQuantityChange}
                            onRemove={onRemove}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CartList;
