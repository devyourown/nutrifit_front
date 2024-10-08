import { useEffect, useState } from "react";
import { CouponDto } from "@/app/lib/types/definition";
import { fetchUserCoupon } from "@/app/lib/api/coupon";
import { fetchUserPoint } from "@/app/lib/api/point";

interface UseCouponPointModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (appliedCoupons: CouponDto, points: number) => void;
    orderTotal: number;
}

export default function UseCouponPointModal({
    isOpen,
    onClose,
    onApply,
    orderTotal,
}: UseCouponPointModalProps) {
    const [selectedCoupon, setSelectedCoupon] = useState<CouponDto | null>(null);
    const [inputPoints, setInputPoints] = useState<number>();
    const [coupons, setCoupons] = useState<CouponDto[]>([]);
    const [couponPage, setCouponPage] = useState(0);
    const [point, setPoint] = useState(0);

    async function fetchCouponsAndPoint(page: number) {
        const token = localStorage.getItem('jwt')!;
        const response_coupons = await fetchUserCoupon(token, page);
        const response_point = await fetchUserPoint(token);
        setCoupons(response_coupons);
        setPoint(response_point);
    }
    
    useEffect(() => {
        fetchCouponsAndPoint(couponPage);
    }, [couponPage]);

    const handleCouponChange = (coupon: CouponDto, minimumOrderAmount: number) => {
        if (orderTotal >= minimumOrderAmount) {
            setSelectedCoupon(coupon);
        } else {
            alert(`이 쿠폰을 사용하려면 최소 주문 금액이 ${minimumOrderAmount}원 이상이어야 합니다.`);
        }
    };

    const handleApply = () => {
        onApply(selectedCoupon!, inputPoints!);
        onClose();
    };

    const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const points = Math.min(Number(e.target.value), point, orderTotal);
        setInputPoints(points);
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">쿠폰 및 포인트 사용</h3>

                <div className="mb-4">
                    <h4 className="font-semibold mb-2">사용 가능한 쿠폰</h4>
                    {coupons.length > 0 ? (
                        coupons.map((coupon) => (
                            <div key={coupon.code} className="flex items-center justify-between mb-2 p-2 border rounded-md">
                                <div>
                                    <h5 className="font-bold">{coupon.description}</h5>
                                    <p className="text-sm text-gray-600">
                                        {coupon.discountType === "PERCENTAGE"
                                            ? `${coupon.discountValue}% 할인`
                                            : `₩${coupon.discountValue} 할인`}
                                        , 최소 주문 금액: ₩{coupon.minimumOrderAmount}
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    disabled={orderTotal < coupon.minimumOrderAmount}
                                    checked={selectedCoupon!.code === coupon.code}
                                    onChange={() => handleCouponChange(coupon, coupon.minimumOrderAmount)}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                            </div>
                        ))
                    ) : (
                        <p>사용 가능한 쿠폰이 없습니다.</p>
                    )}
                </div>

                <div className="mb-4">
                    <h4 className="font-semibold mb-2">포인트 사용 (최대 {point}점)</h4>
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={handlePointsChange}
                        placeholder="사용할 포인트 입력"
                        min={0}
                        max={point}
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md" onClick={onClose}>
                        취소
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={handleApply}>
                        적용
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}
