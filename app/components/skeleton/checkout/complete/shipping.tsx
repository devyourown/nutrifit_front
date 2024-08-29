export default function ShippingSkeleton() {
    return (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-4">
            <div className="animate-pulse bg-gray-300 rounded-lg h-6 w-1/2 mb-4" />
            <div className="animate-pulse bg-gray-300 rounded-lg h-4 w-3/4" />
            <div className="animate-pulse bg-gray-300 rounded-lg h-4 w-3/4" />
            <div className="animate-pulse bg-gray-300 rounded-lg h-4 w-3/4" />
        </div>
    );
}
