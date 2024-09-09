export default function FilterSkeleton() {
    return (
      <div className="p-4 bg-white shadow rounded-lg">
        <p className="text-xl animate-pulse bg-gray-300 h-6 rounded-md"></p>
        <div className="mt-4 space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-300 h-8 rounded-md"></div>
          ))}
        </div>
      </div>
    );
  };
  