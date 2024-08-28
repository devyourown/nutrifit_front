import { fetchUserCoupon } from "@/app/lib/api/coupon";
import { CouponDto } from "@/app/lib/types/definition";
import { useEffect, useState } from "react";

interface CouponProps {
    token: string;
}

export default function Coupon({token}: CouponProps) {
    const [coupons, setCoupons] = useState<CouponDto[]>([]);
    useEffect(() => {
        const getCoupons = async () => {
            const result = await fetchUserCoupon(token);
            setCoupons(result);  
        }
        getCoupons();
        
    }, []);
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">보유 쿠폰</h2>
            <div className="space-y-4">
                {coupons.length > 0 ? coupons.map((coupon) => (
                    <div key={coupon.code} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between">
                            <span>{coupon.description}</span>
                            <span>{coupon.validFrom} - {coupon.validUntil}</span>
                        </div>
                    </div>
                )): <div>보유 중인 쿠폰이 없네요...</div>}
            </div>
        </div>
    );
}