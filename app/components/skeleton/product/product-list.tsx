export default function ProductListSkeleton() {
    return (
      <div className="flex flex-wrap justify-center space-x-4 p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden w-80 flex flex-col m-2 transform transition-transform hover:scale-105 cursor-pointer animate-pulse">
            <div className="h-60 bg-gray-300"></div>
            <div className="p-4 space-y-3">
              <div className="bg-gray-300 h-4 rounded-md"></div>
              <div className="bg-gray-300 h-4 w-1/2 rounded-md"></div>
              <div className="bg-gray-300 h-4 rounded-md"></div>
              <div className="bg-gray-300 h-4 w-3/4 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  