export default function PaymentSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded-lg mb-4 mt-6"></div>
            <div className="p-4 bg-gray-100 shadow-md rounded-lg">
                <div className="space-y-4">
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="mt-6">
                    <div className="h-12 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}
