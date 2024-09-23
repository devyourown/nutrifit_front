import { assignUserCoupon, fetchUserCoupon } from "@/app/lib/api/coupon";
import { CouponDto } from "@/app/lib/types/definition";
import useSWR from "swr";
import CouponSkeleton from "../../skeleton/user/coupon";
import { useState } from "react";

interface CouponProps {
    token: string;
}

export default function Coupon({token}: CouponProps) {
    const { data: coupons, error, mutate } = useSWR(token ? `/coupon/${token}` : null, () => fetchUserCoupon(token));

    const [couponCode, setCouponCode] = useState("");
    const [addError, setAddError] = useState<string | null>(null);
    const [adding, setAdding] = useState(false);

    const handleAddCoupon = async () => {
        setAdding(true);
        setAddError(null);
        try {
            // 여기에 실제 쿠폰을 추가하는 API 요청을 수행
            const response: any = await assignUserCoupon(token, couponCode);
            if (response !== "쿠폰이 정상적으로 할당 되었습니다.") {
                alert("쿠폰이 만료되었거나 코드가 맞지 않습니다.");
                return;
            }
            setCouponCode("");
            // 쿠폰 목록을 다시 불러오기 (SWR의 mutate 사용)
            await mutate();
        } catch (err: any) {
            setAddError(err.message);
        } finally {
            setAdding(false);
        }
    };

    if (error) return <div>쿠폰을 불러오는 중 오류가 발생했습니다.</div>;

    if (!coupons) return <div><CouponSkeleton/></div>;
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">보유 쿠폰</h2>
            <div className="mb-4">
                <label htmlFor="couponCode" className="block text-sm font-medium text-center text-gray-700">
                    쿠폰 코드로 추가하기
                </label>
                <div className="flex space-x-2 mt-1">
                    <input
                        type="text"
                        id="couponCode"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="쿠폰 코드를 입력하세요"
                    />
                    <button
                        onClick={handleAddCoupon}
                        className={`flex-shrink-0 bg-blue-500 text-white px-4 py-2 rounded-md ${adding ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 transition duration-200"}`}
                        disabled={adding || !couponCode.trim()}
                    >
                        {adding ? "추가 중..." : "추가하기"}
                    </button>
                </div>
                {addError && <p className="text-red-500 text-sm mt-2">{addError}</p>}
            </div>
            <div className="space-y-4">
            {coupons.length > 0 ? coupons.map((coupon: CouponDto) => (
    <div key={coupon.code} className="p-4 border rounded-lg bg-white shadow-sm transition hover:shadow-lg">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-blue-600">{coupon.description}</h3>
            <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                {coupon.discountType}
            </div>
        </div>
        <div className="text-gray-600 text-sm">
            <span className="mr-2">
                <strong>유효기간:</strong> {new Date(coupon.validFrom).toLocaleDateString()} - {new Date(coupon.validUntil).toLocaleDateString()}
            </span>
        </div>
    </div>
)) : <div>보유 중인 쿠폰이 없네요...</div>}
            </div>
        </div>
    );
}