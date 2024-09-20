export default function PointSkeleton() {
    return (
    <div>
      <h2 className="text-xl font-semibold mb-4">포인트</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg mb-4 animate-pulse">
        <div className="flex justify-between">
          <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
          <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-50 animate-pulse">
            <div className="flex justify-between">
              <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
              <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="w-1/2 h-4 bg-gray-300 rounded mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}