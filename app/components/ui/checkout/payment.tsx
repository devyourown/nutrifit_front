import { checkPayment, checkPaymentWithoutMember, completePayment } from "@/app/lib/api/payment";
import { CartItem, Order, Orderer } from "@/app/lib/types/definition";
import PortOne from "@portone/browser-sdk/v2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsCreditCardFill } from "react-icons/bs";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";

interface PaymentProps {
    order: Order;
    steps: number;
    items: CartItem[];
    orderer: Orderer;
}

type PaymentMethod = "CARD" | "TRANSFER" | "VIRTUAL_ACCOUNT"

export default function Payment({ steps, order, items, orderer }: PaymentProps) {
    const router = useRouter();
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("CARD");

    const handlePaymentChange = (event: any) => {
        setSelectedPayment(event.target.value);
    };

    const handlePayment = async () => {
        const response = await PortOne.requestPayment({
            storeId: "store-9218e77d-05ff-4609-ab0c-ec6b7706ed9d",
            paymentId: order.id,
            orderName: items.reduce((acc, cur, index) => {
                if (index === 0) return cur.name;
                return acc + ", " + cur.name;
            }, " ")!,
            totalAmount: order.total,
            currency: "CURRENCY_KRW",
            channelKey: "channel-key-35a0ddd7-5b51-49a7-81ea-e7fb5773d551",
            payMethod: selectedPayment,
            redirectUrl: `http://localhost:3000/checkout/complete/${order.id}`,
        });
        if (response?.code != null) {
            return alert(response.message);
        }
        const token = localStorage.getItem('jwt');
        let result;
        if (token) {
            result = await checkPayment({orderId: order.id, 
                total: order.total, paymentMethod: selectedPayment,
                paymentId: response?.paymentId!, orderItems: items, ordererDto: orderer,
                subtotal: order.subtotal, discount: order.subtotal - order.total, shippingFee: order.shipping 
            }, token);
        } else {
            result = await checkPaymentWithoutMember({orderId: order.id, 
                total: order.total, paymentMethod: selectedPayment,
                paymentId: response?.paymentId!, orderItems: items, ordererDto: orderer,
                subtotal: order.subtotal, discount: order.subtotal - order.total, shippingFee: order.shipping 
            }, orderer.ordererPhone);
        }
        if (result) {
            //cart를 정리하고 결제 완료 페이지로 이동
            await completePayment(items.map(item => item.id));
            router.push(`/checkout/complete/${order.id}`);
        } else {
            alert('오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };
    return steps === 1 ? (
        <h3 className="text-gray text-xl font-semibold mt-6 mb-4">결제 방법</h3>
    ) : (
        <>
            <h3 className="text-xl font-semibold mb-4 mt-6">결제 방법</h3>
            <div className="p-4 bg-white shadow-md rounded-lg">
                <div className="space-y-4">
                    <label
                        className={`flex items-center p-4 border rounded-md cursor-pointer ${
                            selectedPayment === "CARD"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300"
                        }`}
                    >
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="CARD"
                            checked={selectedPayment === "CARD"}
                            onChange={handlePaymentChange}
                            className="form-radio text-blue-500"
                        />
                        <span className="ml-2 text-gray-700">신용카드</span>
                        <i className="ml-auto text-3xl">
                            <BsCreditCardFill />
                        </i>
                    </label>

                    <label
                        className={`flex items-center p-4 border rounded-md cursor-pointer ${
                            selectedPayment === "TRANSFER"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300"
                        }`}
                    >
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="TRANSFER"
                            checked={selectedPayment === "TRANSFER"}
                            onChange={handlePaymentChange}
                            className="form-radio text-blue-500"
                        />
                        <span className="ml-2 text-gray-700">계좌 이체</span>
                        <span className="ml-auto text-green-700 rounded-lg text-3xl">
                            <FaMoneyCheckAlt />
                        </span>
                    </label>

                    <label
                        className={`flex items-center p-4 border rounded-md cursor-pointer ${
                            selectedPayment === "VIRTUAL_ACCOUNT"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300"
                        }`}
                    >
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="VIRTUAL_ACCOUNT"
                            checked={selectedPayment === "VIRTUAL_ACCOUNT"}
                            onChange={handlePaymentChange}
                            className="form-radio text-blue-500"
                        />
                        <span className="ml-2 text-gray-700">무통장 입금</span>
                        <span className="ml-auto text-4xl">
                            <TbPigMoney />
                        </span>
                    </label>
                </div>
                <div className="mt-6">
                    <button
                        onClick={handlePayment}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        결제하기
                    </button>
                </div>
            </div>
        </>
    );
}
