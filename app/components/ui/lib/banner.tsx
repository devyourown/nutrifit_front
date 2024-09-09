import Link from "next/link";

export default function Banner() {
    return (
        <div className="relative w-full h-96 bg-gray-800 text-white overflow-hidden">
      <img
        src="/banner.jpg"
        alt="Banner Background"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          새로운 제품 출시!
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          다이어터분들을 위한 제품을 준비했습니다
        </p>
        <Link href="/shop" className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-pink-700 transition">
          둘러보기
        </Link>
      </div>
    </div>
    );
}
