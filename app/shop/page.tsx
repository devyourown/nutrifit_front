"use client";

import { useEffect, useState } from "react";
import ProductFilter from "../components/ui/product/filter";
import ProductList from "../components/ui/product/product-list";
import { fetchAllProducts, fetchProductsByCategory } from "../lib/api/product";
import { ProductDto } from "@/app/lib/types/definition";
import ProductSkeleton from "../components/skeleton/product/products";

export default function Page() {
    const [products, setProducts] = useState<ProductDto[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getInitialProducts = async () => {
            const response = await fetchAllProducts();
            setProducts(response);
            setLoading(false);
        }
        getInitialProducts();
    }, []);
    
    const handleFilterChange = async (category: string) => {
        const filteredProducts = await fetchProductsByCategory(category);
        setProducts(filteredProducts);
    };

    return (
        loading ? <ProductSkeleton/> :
        <div className="flex">
            <div className="w-1/4 ml-4">
            <ProductFilter onFilterChange={handleFilterChange}/>
            </div>
            <div className="w-3/4 flex flex-wrap justify-center">
            <ProductList products={products!} />
            </div>
        </div>
    );
}
