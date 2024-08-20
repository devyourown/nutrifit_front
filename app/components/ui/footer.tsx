import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-sm">
        {/* Services Section */}
        <div>
          <h3 className="font-bold mb-4 tracking-widest">SERVICES</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/customer-service" className="hover:underline">
                customer service
              </Link>
            </li>
            <li>
              <Link href="/payment" className="hover:underline">
                payment
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:underline">
                shipping
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:underline">
                returns
              </Link>
            </li>
          </ul>
        </div>

        {/* Sticky Lemon Section */}
        <div>
          <h3 className="font-bold mb-4 tracking-widest">NUTRIFIT</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:underline">
                about
              </Link>
            </li>
            <li>
              <Link href="/wholesale" className="hover:underline">
                wholesale
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                contact
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                terms & conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="font-bold mb-4 tracking-widest">NEWSLETTER</h3>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Email Address"
              className="px-4 py-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white text-[#907147] font-bold rounded"
            >
              Go!
            </button>
          </form>
          <ul className="mt-8 space-y-2">
            <li>
              <Link href="/facebook" className="hover:underline">
                facebook
              </Link>
            </li>
            <li>
              <Link href="/instagram" className="hover:underline">
                instagram
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Payment Icons */}
      

      {/* Copyright Section */}
      <div className="container mx-auto mt-6 text-center text-xs text-white">
        copyright Nutrifit {new Date().getFullYear()} - all rights reserved
      </div>
    </footer>
    );
}
