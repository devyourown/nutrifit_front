export default function UserSkeleton() {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl animate-pulse">
          {/* Welcome 섹션 스켈레톤 */}
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-300 mr-4"></div>
            <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
          </div>
  
          {/* 탭 버튼 스켈레톤 */}
          <div className="flex space-x-4 mb-6">
            <div className="flex items-center px-4 py-2 bg-gray-300 rounded-lg w-32 h-10"></div>
            <div className="flex items-center px-4 py-2 bg-gray-300 rounded-lg w-32 h-10"></div>
            <div className="flex items-center px-4 py-2 bg-gray-300 rounded-lg w-32 h-10"></div>
            <div className="flex items-center px-4 py-2 bg-gray-300 rounded-lg w-32 h-10"></div>
          </div>
  
          {/* 탭 내용 스켈레톤 */}
          <div className="space-y-4">
            <div className="w-full h-6 bg-gray-300 rounded"></div>
            <div className="w-full h-6 bg-gray-300 rounded"></div>
            <div className="w-full h-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  };
  
  