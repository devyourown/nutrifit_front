import Link from "next/link";

export default function ProductCard() {
    return (
        <div className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
            <img
                src="/images/sample-product.jpg"
                alt="Sample Product"
                className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Sample Product</h3>
            <p className="text-gray-700 mb-4">$20.00</p>
            <Link href="/products/1">
                <a className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                    View Details
                </a>
            </Link>
        </div>
    );
}
