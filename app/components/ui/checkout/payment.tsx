import { CartItem, Order } from "@/app/lib/types/definition";
import PortOne from "@portone/browser-sdk/v2";
import { useState } from "react";
import { BsCreditCardFill } from "react-icons/bs";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";

interface PaymentProps {
    order: Order;
    steps: number;
    items: CartItem[];
}

type PaymentMethod = "CARD" | "TRANSFER" | "VIRTUAL_ACCOUNT"

export default function Payment({ steps, order, items }: PaymentProps) {
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("CARD");

    const handlePaymentChange = (event: any) => {
        setSelectedPayment(event.target.value);
    };

    const handlePayment = async () => {
        const response = await PortOne.requestPayment({
            storeId: "store-e4038486-8d83-41a5-acf1-844a009e0d94",
            paymentId: order.id,
            orderName: items.reduce((acc, cur, index) => {
                if (index === 0) return cur.name;
                return acc + ", " + cur.name;
            }, " ")!,
            totalAmount: order.total,
            currency: "CURRENCY_KRW",
            channelKey: "channel-key-4ca6a942-3ee0-48fb-93ef-f4294b876d28",
            payMethod: selectedPayment,
            redirectUrl: "https://sdk-playground.portone.io/",
        });
        if (response?.code != null) {
            return alert(response.message);
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
