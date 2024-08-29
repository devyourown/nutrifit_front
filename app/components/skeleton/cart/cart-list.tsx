import CartItemSkeleton from "./cart-item";

export default function CartListSkeleton() {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                    <CartItemSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}
