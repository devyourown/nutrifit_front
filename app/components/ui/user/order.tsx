import { fetchUserOrders } from "@/app/lib/api/order";
import { OrderDto } from "@/app/lib/types/definition";
import { useEffect, useState } from "react";

interface UserOrderProps {
    token: string;
}

export default function UserOrder({token}: UserOrderProps) {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<OrderDto[]>([]);
    const [status, setStatus] = useState('all');
    useEffect(() => {
        const getOrders = async () => {
            const result = await fetchUserOrders(token);
            setOrders(result);  
        }
        getOrders();
        if (orders) {
            setFilteredOrders(orders.filter( (order) => status === 'all' || order.status === status));
        }
    }, [])

        return (
            <div>
                <div className="flex mb-4">
                    <button
                        className={`px-4 py-2 mr-2 rounded-lg transition ${status === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setStatus('all')}
                    >
                        전체
                    </button>
                    <button
                        className={`px-4 py-2 mr-2 rounded-lg transition ${status === '배송 준비중' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setStatus('배송 준비중')}
                    >
                        배송 준비중
                    </button>
                    <button
                        className={`px-4 py-2 mr-2 rounded-lg transition ${status === '배송중' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setStatus('배송중')}
                    >
                        배송중
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg transition ${status === '배송 완료' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setStatus('배송 완료')}
                    >
                        배송 완료
                    </button>
                </div>
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="p-4 border rounded-lg bg-gray-50">
                            <h3 className="text-lg font-semibold">
                                주문번호: {order.id}
                            </h3>
                            <p className="text-sm text-gray-500">
                                주문일자: {order.orderDate} | 상태: {order.status}
                            </p>
                            <div className="mt-2 space-y-2">
                                {order.orderItems.map((item) => (
                                    <div key={item.productId} className="flex justify-between">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>{(item.price * item.quantity).toLocaleString('ko-KR')}원</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

}