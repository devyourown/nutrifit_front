import { CartItem, PaymentDto } from "@/app/lib/types/definition";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

interface PaymentSummaryProps {
    orderId: string;
    items: CartItem[];
    subtotal: number;
    shippingFee: number;
    discount: number;
    usedPoints: number;
    total: number;
}

export default function PaymentSummary({orderId, items, subtotal, shippingFee, discount, usedPoints, total}: PaymentSummaryProps) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <div className="flex flex-col items-center mb-6">
                    <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">
                        결제가 완료되었습니다!
                    </h1>
                    <p className="text-gray-600 mt-2">주문번호: {orderId}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold mb-4">주문 요약</h2>
                    <div className="space-y-4">
                    {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center border-b pb-4 mb-4"
                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                    className="object-cover rounded"
                                />
                                <div className="ml-4 flex-1">
                                    <h3 className="text-lg font-medium">{item.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {item.quantity} x{' '}
                                        {item.price.toLocaleString('ko-KR')}원
                                    </p>
                                </div>
                                <p className="text-lg font-semibold text-gray-700">
                                    {(item.quantity * item.price).toLocaleString('ko-KR')}원
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm font-medium">총 상품 금액</span>
                        <span>{subtotal.toLocaleString('ko-KR')}원</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm font-medium">배송비</span>
                        <span>{shippingFee.toLocaleString('ko-KR')}원</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm font-medium">할인 금액</span>
                        <span>-{discount.toLocaleString('ko-KR')}원</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm font-medium">사용한 포인트</span>
                        <span>-{usedPoints!.toLocaleString('ko-KR')}원</span>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300">
                        <span className="text-xl font-semibold">총 결제 금액</span>
                        <span className="text-2xl font-bold text-gray-800">
                            {total.toLocaleString('ko-KR')}원
                        </span>
                    </div>
                </div>
            </div>
    )
}