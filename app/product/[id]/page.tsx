import ProductDetail from "@/app/components/ui/product/product-detail";
import { fetchProductById } from "@/app/lib/api/product";

export default async function page({params}: { params: {id: number}}) {
    const product = await fetchProductById(params.id);
    console.log(product);
    return (
        <ProductDetail product={product}/>
    )
}