import Image from "next/image";
import Header from "./components/header";
import ProductCard from "./components/product_cart";
import Footer from "./components/footer";
import Banner from "./components/banner";

export default function Home() {
    return (
        <>
            <Header />
            <Banner />
            <section className="container mx-auto my-8">
                <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* 여기에 ProductCard 컴포넌트를 반복 렌더링 */}
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </section>
            <Footer />
        </>
    );
}
