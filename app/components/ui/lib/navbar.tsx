import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold">
                NutriFit
            </Link>
            <div>
                <Link href="/products" className="mx-4">
                    Shop
                </Link>
                <Link href="/cart" className="mx-4">
                    Cart
                </Link>
                <Link href="/login" className="mx-4">
                    login
                </Link>
            </div>
        </nav>
    );
}
