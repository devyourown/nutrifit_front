import CheckoutSummarySkeleton from "./checkout-summary";
import CustomerDetailsSkeleton from "./customer-details";
import PaymentSkeleton from "./payment";

export default function CheckoutSkeleton() {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded-lg mb-6"></div>
                        <CustomerDetailsSkeleton />
                        <PaymentSkeleton />
                    </div>
                </div>
                <div className="flex-shrink-0 w-full md:w-1/3">
                    <CheckoutSummarySkeleton />
                </div>
            </div>
        </div>
    );
}
