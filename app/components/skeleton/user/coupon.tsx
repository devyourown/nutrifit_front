export default function CouponSkeleton() {
    return (<div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="p-4 border rounded-lg bg-gray-50 animate-pulse">
          <div className="flex justify-between">
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>)
}