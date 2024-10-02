import { Cart, CartItem, Order } from "@/app/lib/types/definition";
import UseCouponPointModal from "./modal";
import { useState } from "react";

interface CheckoutSummaryProps {
    items: CartItem[];
    order: Order;
}

export default function CheckoutSummary({
    items,
    order,
}: CheckoutSummaryProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [discountedTotal, setDiscountedTotal] = useState(order.total);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleApplyCouponPoint = async (couponCode: string, points: number) => {
        let totalAfterDiscount = order.total;

        const coupon = order.availableCoupons.find((c) => c.code === couponCode);
        if (coupon) {
            if (coupon.discountType === "PERCENTAGE") {
                totalAfterDiscount -= Math.min(
                    (order.subtotal * coupon.discountValue) / 100,
                    coupon.maxDiscountAmount
                );
            } else {
                totalAfterDiscount -= Math.min(coupon.discountValue, coupon.maxDiscountAmount);
            }
        }
        totalAfterDiscount = Math.max(totalAfterDiscount - points, 0);
        setDiscount(order.total - totalAfterDiscount);

        try {
            const response = await fetch(`/api/checkout`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usedCoupon: coupon?.code,
                    usedPoints: points,
                    totalAfterDiscount: totalAfterDiscount,
                    id: localStorage.getItem('id'),
                }),
            });

            if (response.ok) {
                setDiscountedTotal(totalAfterDiscount);
                alert("쿠폰 및 포인트가 적용되었습니다.");
            } else {
                alert("할인 적용 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("할인 적용 중 오류 발생:", error);
            alert("할인 적용 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg sticky top-4">
            <h3 className="text-xl font-semibold mb-4">
                주문 요약 ({items.length})
            </h3>
            {items.map((item) => {
                return (
                    <div key={item.name} className="flex justify-between mb-2">
                        <div>
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-24 h-24 object-cover mr-2 inline-block"
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
            <div className="mb-4">
                <a
                    href="#"
                    onClick={openModal}
                    className="text-blue-600"
                >
                    쿠폰 및 포인트 사용하기
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
            <div className="flex justify-between mb-2">
                <span>할인</span>
                <span>-₩{discount}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
                <span>총 비용</span>
                <span>₩{discountedTotal}</span>
            </div>

            {isModalOpen && (
                <UseCouponPointModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onApply={handleApplyCouponPoint}
                availableCoupons={order.availableCoupons}
                availablePoints={order.availablePoints}
                orderTotal={order.total}
                />
            )}
        </div>
    );
}
