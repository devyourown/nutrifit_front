export default function PaymentSummarySkeleton() {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl space-y-6">
            <div className="flex flex-col items-center mb-6">
                <div className="animate-pulse bg-gray-300 rounded-full h-16 w-16 mb-4" />
                <div className="animate-pulse bg-gray-300 rounded-lg h-8 w-3/4 mb-2" />
                <div className="animate-pulse bg-gray-300 rounded-lg h-6 w-1/2" />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center border-b pb-4 mb-4">
                        <div className="animate-pulse bg-gray-300 rounded-lg h-16 w-16" />
                        <div className="flex-1 ml-4">
                            <div className="animate-pulse bg-gray-300 rounded-lg h-4 w-3/4 mb-2" />
                            <div className="animate-pulse bg-gray-300 rounded-lg h-4 w-1/2" />
                        </div>
                        <div className="animate-pulse bg-gray-300 rounded-lg h-6 w-12" />
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="animate-pulse bg-gray-300 rounded-lg h-4 w-1/3" />
                <div className="animate-pulse bg-gray-300 rounded-lg h-4 w-1/4" />
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="animate-pulse bg-gray-300 rounded-lg h-4 w-1/3" />
                <div className="animate-pulse bg-gray-300 rounded-lg h-4 w-1/4" />
            </div>
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300">
                <div className="animate-pulse bg-gray-300 rounded-lg h-6 w-1/2" />
                <div className="animate-pulse bg-gray-300 rounded-lg h-6 w-1/4" />
            </div>
        </div>
    );
}
