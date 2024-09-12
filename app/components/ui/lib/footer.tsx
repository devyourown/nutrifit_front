import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 text-white text-sm">
        {/* Services Section */}
        <div>
          <h3 className="font-bold mb-4 tracking-widest">고객 서비스 </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/nonmember/order" className="hover:underline">
                비회원 주문 조회
              </Link>
            </li>
          </ul>
        </div>

        {/* Sticky Lemon Section */}
        <div>
          <h3 className="font-bold mb-4 tracking-widest">뉴트리핏</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:underline">
                전체 상품보기
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                연락처
              </Link>
            </li>
          </ul>
        </div>
      </div>
      

      {/* Copyright Section */}
      <div className="container mx-auto mt-6 text-center text-xs text-white">
        copyright Nutrifit {new Date().getFullYear()} - all rights reserved
      </div>
    </footer>
    );
}
