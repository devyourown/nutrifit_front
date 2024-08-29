export default function OrderSummarySkeleton() {
    return (
        <div className="bg-gray-50 shadow-md rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <hr />
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
            </div>
        </div>
    );
}
