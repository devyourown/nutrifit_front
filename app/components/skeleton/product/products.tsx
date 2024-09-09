import FilterSkeleton from "./filter";
import ProductListSkeleton from "./product-list";

export default function ProductSkeleton() {
    return (
        <div className="flex">
          <div className="w-1/4 ml-4">
            <FilterSkeleton />
          </div>
          <div className="w-3/4 flex flex-wrap justify-center">
            <ProductListSkeleton /> 
          </div>
        </div>
      );
}