import ProductDetail from "@/app/components/ui/product/product-detail";

export default function page({params}: { params: {id: string}}) {
    return (
        <ProductDetail />
    )
}