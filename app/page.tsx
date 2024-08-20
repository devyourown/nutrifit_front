import Image from "next/image";
import Header from "./components/ui/header";
import ProductCard from "./components/ui/product/product-card";
import Footer from "./components/ui/footer";
import Banner from "./components/ui/banner";
import Features from "./components/ui/feature-products";

export default function Home() {
    return (
        <>
            <Banner />
            <Features/>
        </>
    );
}
