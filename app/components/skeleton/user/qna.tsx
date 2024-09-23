export default function QnASkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-200 animate-pulse">
                    <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
            ))}
        </div>
    );
}