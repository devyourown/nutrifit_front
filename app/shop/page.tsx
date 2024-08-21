import ProductList from "../components/ui/product/product-list";
import { fetchAllProducts } from "../lib/api/product";
import { ProductDto } from "@/app/lib/types/definition";

export default async function page() {
    const products = (await fetchAllProducts()) as ProductDto[];
    return (
        <>
            <ProductList products={products} />
        </>
    );
}
