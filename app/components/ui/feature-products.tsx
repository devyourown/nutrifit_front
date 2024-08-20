import ProductCard from "./product/product-card";

const cards = [
    {
        imageUrl: '/sample1.jfif',
        title: "닭가슴살",
        price: 2100,
    },
    {
        imageUrl: '/sample2.jfif',
        title: "닭가슴살",
        price: 2100,
    },
    {
        imageUrl: '/sample3.jfif',
        title: "닭가슴살",
        price: 2100,
    },
]

export default function Features() {
    return (
        <section className="container mx-auto my-8">
                <h2 className="text-3xl font-bold mb-4">인기 상품</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card) => {
                        return (
                            <ProductCard 
                            key={card.title}
                            imageUrl={card.imageUrl}
                            title={card.title}
                            price={card.price}/>
                        )
                    })}
                </div>
            </section>
    )
}