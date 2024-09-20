export default function OrderListSkeleton() {
    return (
      <div className="space-y-4">
        {/* 스켈레톤 UI의 주문 아이템 반복 */}
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg animate-pulse"
            >
              {/* 이미지 스켈레톤 */}
              <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
  
              {/* 텍스트 스켈레톤 */}
              <div className="flex-grow space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
  
              {/* 가격, 수량 등 */}
              <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
            </div>
          ))}
      </div>
    );
  };
  