"use client";

import { useState } from "react";
import ProductFilter from "../components/ui/product/filter";
import ProductList from "../components/ui/product/product-list";
import {
    fetchProductsByCategory,
    fetchReleasedProducts,
} from "../lib/api/product";
import ProductSkeleton from "../components/skeleton/product/products";
import Pagination from "../components/ui/lib/pagination";
import useSWR from "swr";

export default function Page() {
    const [category, setCategory] = useState<string | null>(null);
    const [page, setPage] = useState(0);

    const { data: productsResponse, error } = useSWR(
        [category, page],
        async () => {
            if (category) {
                return fetchProductsByCategory(category, page);
            }
            return fetchReleasedProducts(page);
        }
    );

    const products = productsResponse?.content ?? [];
    const totalPages = productsResponse?.page?.totalPages || 0;
    const categories: string[] =
        products.length > 0
            ? Array.from(
                  new Set(products.map((product: any) => product.category))
              )
            : [];

    const handleFilterChange = (category: string) => {
        setCategory(category);
        setPage(0);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    if (error)
        return (
            <div>
                상품을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해
                주세요.
            </div>
        );

    return !products ? (
        <ProductSkeleton />
    ) : (
        <div className="flex">
            <div className="w-1/4 ml-4">
                <ProductFilter
                    onFilterChange={handleFilterChange}
                    categories={categories}
                />
            </div>
            <div className="w-3/4 flex flex-col flex-wrap justify-center">
                <ProductList products={products!} />
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
