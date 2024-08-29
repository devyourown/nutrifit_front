export default function CartItemSkeleton() {
    return (
        <div className="flex items-center justify-between border-b py-4 animate-pulse">
            <div className="flex items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
                <div className="ml-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="w-6 h-6 bg-gray-200 rounded-md"></div>
            </div>
        </div>
    );
}
