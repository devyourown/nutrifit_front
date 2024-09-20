import { fetchUserOrders } from "@/app/lib/api/order";
import { OrderDto } from "@/app/lib/types/definition";
import { useEffect, useState } from "react";
import Pagination from "../lib/pagination";
import OrderItem from "./order-item";
import OrderListSkeleton from "../../skeleton/user/order-item";
import useSWR from "swr";

interface UserOrderProps {
    token: string;
}

export default function UserOrder({token}: UserOrderProps) {
    const [currentPage, setCurrentPage] = useState(0);

    const { data: ordersResponse, error } = useSWR([token, currentPage], async () => fetchUserOrders(token, currentPage));
    const orders = ordersResponse?.content;
    const page = ordersResponse?.page;

    if (!ordersResponse && !error) {
        return <div><OrderListSkeleton/></div>
    }

    if (error) {
        return <div>주문을 불러오는 중 오류가 발생했습니다.</div>
    }

        return (
            <div>
                <div className="space-y-4">
                    {orders.map((order: OrderDto, index: number) => (
                        <OrderItem key={index} 
                        token={token}
                        productId={order.productId}
                        title={order.productName!} 
                        price={order.totalAmount!}
                        quantity={order.quantity}
                        imageUrl={order.imageUrl}
                        fulfillment={order.fulfillment}
                        orderDate={order.orderDate}/>
                    ))}
                </div>
                <Pagination
                currentPage={currentPage}
                totalPages={page.totalPages}
                onPageChange={setCurrentPage}
                />
            </div>
        );

}