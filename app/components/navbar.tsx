import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-4">
            <Link href="/">
                <a className="text-2xl font-bold">CoalandCanary</a>
            </Link>
            <div>
                <Link href="/products">
                    <a className="mx-4">Shop</a>
                </Link>
                <Link href="/cart">
                    <a className="mx-4">Cart</a>
                </Link>
                <Link href="/checkout">
                    <a className="mx-4">Checkout</a>
                </Link>
            </div>
        </nav>
    );
}
