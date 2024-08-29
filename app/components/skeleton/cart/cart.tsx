import CartListSkeleton from "./cart-list";
import OrderSummarySkeleton from "./order-summary";

export default function CartSkeleton() {
    return (
        <div className="container mx-auto py-10 px-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="flex-1 mb-8 lg:mb-0">
                    <CartListSkeleton />
                </div>
                <div className="w-full lg:w-1/3">
                    <OrderSummarySkeleton />
                </div>
            </div>
        </div>
    );
}
