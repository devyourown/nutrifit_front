import Banner from "./components/ui/lib/banner";
import ProductList from "./components/ui/product/product-list";
import { fetchAllProducts } from "./lib/api/product";

export default async function Home() {
    const products = await fetchAllProducts(0);
    return (
        <>
            <Banner />
            <div className="flex flex-col">
                <div className="text-4xl px-4 py-4 text-center font-bold">인기 상품</div>
                {products && <ProductList products={products.content}/>}
            </div>
        </>
    );
}
