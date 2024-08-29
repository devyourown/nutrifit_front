export default function CheckoutSummarySkeleton() {
    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg sticky top-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded-lg mb-4"></div>
            <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex justify-between mb-2">
                        <div className="flex items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg mr-2"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        <div className="w-12 h-6 bg-gray-200 rounded-lg"></div>
                    </div>
                ))}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-2">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="flex justify-between mb-2">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
        </div>
    );
}
