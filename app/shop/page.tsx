"use client";

import { useEffect, useState } from "react";
import ProductFilter from "../components/ui/product/filter";
import ProductList from "../components/ui/product/product-list";
import { fetchAllProducts, fetchProductsByCategory } from "../lib/api/product";
import { ProductDto } from "@/app/lib/types/definition";
import ProductSkeleton from "../components/skeleton/product/products";
import Pagination from "../components/ui/lib/pagination";

export default function Page() {
    const [products, setProducts] = useState<ProductDto[]>();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchProducts = async (page: number) => {
        const response = await fetchAllProducts(page);
        setProducts(response.content);
        setTotalPages(response.page.totalPages);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        fetchProducts(page);
    }, [page]);
    
    const handleFilterChange = async (category: string) => {
        const filteredProducts = await fetchProductsByCategory(category, page);
        setProducts(filteredProducts);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    }

    return (
        loading ? <ProductSkeleton/> :
        <div className="flex">
            <div className="w-1/4 ml-4">
            <ProductFilter onFilterChange={handleFilterChange}/>
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
