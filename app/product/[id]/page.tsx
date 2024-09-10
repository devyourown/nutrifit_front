import ProductDescribe from "@/app/components/ui/product/product-describe";
import ProductDetail from "@/app/components/ui/product/product-detail";
import { fetchProductById } from "@/app/lib/api/product";
import { ProductDto } from "@/app/lib/types/definition";

export default async function page({params}: { params: {id: number}}) {
    const product: ProductDto = await fetchProductById(params.id);
    return (
        <>
            <ProductDetail id={product.id} options={product.options!} imageUrls={product.imageUrls}
            name={product.name} description={product.description!}/>
            <ProductDescribe id={product.id} detail={product.productDetailDto!} rating={product.reviewRating}
            numOfReviews={product.reviewCount}/>
        </>
    )
}