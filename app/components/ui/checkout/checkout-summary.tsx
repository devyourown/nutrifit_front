import { Cart, CartItem, Order } from "@/app/lib/types/definition";

interface CheckoutSummaryProps {
    items: CartItem[];
    order: Order;
}

export default function CheckoutSummary({
    items,
    order,
}: CheckoutSummaryProps) {
    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg sticky top-4">
            <h3 className="text-xl font-semibold mb-4">
                주문 요약 ({items.length})
            </h3>
            {items.map((item) => {
                return (
                    <div key={item.id} className="flex justify-between mb-2">
                        <div>
                            <img
                                src={item.imageUrl}
                                alt="Moonlit Scenic Snowshoe"
                                className="w-16 h-16 object-cover mr-2 inline-block"
                            />
                            <div>
                                <span>{item.name}</span>
                                <br />
                                <span>{item.quantity}개</span>
                            </div>
                        </div>
                        <div className="flex items-center">₩{item.price}</div>
                    </div>
                );
            })}
            <hr className="my-4" />
            <div className="mb-2">
                <a href="#" className="text-blue-600">
                    쿠폰 코드 입력하기
                </a>
            </div>
            <div className="mb-4">
                <a href="#" className="text-blue-600">
                    적립금 사용하기
                </a>
            </div>
            <div className="flex justify-between mb-2">
                <span>상품 가격</span>
                <span>₩{order.subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>배송비</span>
                <span>₩{order.shipping}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
                <span>총 비용</span>
                <span>₩{order.total}</span>
            </div>
        </div>
    );
}
