import Link from "next/link";
import Shipping from "./shipping"
import PaymentSummary from "./summary"
import Payment from "./payment";
import { PaymentDto } from "@/app/lib/types/definition";
import { useAuth } from "@/app/lib/use-auth";

interface CompleteProps {
    payment: PaymentDto;
}

export default function Complete({payment}: CompleteProps) {
    const { isLoggedIn } = useAuth();
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <PaymentSummary orderId={payment.orderId} items={payment.orderItems} 
                subtotal={payment.subtotal}
                total={payment.total}
                discount={payment.discount}
                shippingFee={payment.shippingFee}
                usedPoints={payment.usedPoints || 0}/>

                <Payment id={payment.paymentId} date={payment.paymentDate!} method={payment.paymentMethod} />

                <Shipping orderer={payment.ordererDto}/>

                <div className="flex justify-between">
                    <Link href="/shop">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                            쇼핑 계속하기
                        </button>
                    </Link>
                    {isLoggedIn &&
                    <Link href="/user/orders">
                        <button className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition">
                            주문 내역 보기
                        </button>
                    </Link>
                    }
                </div>
            </div>
        </div>
    );
}