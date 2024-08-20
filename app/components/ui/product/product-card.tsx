import Link from "next/link";

interface ProductCardProp {
    imageUrl: string;
    title: string;
    price: number;
}

export default function ProductCard({imageUrl, title, price}: ProductCardProp) {
    return (
        <div className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
            <img
                src={imageUrl}
                alt="Sample Product Image"
                className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-700 mb-4">{price}원</p>
            <Link href="/product/1" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                자세히 보기
            </Link>
        </div>
    );
}
