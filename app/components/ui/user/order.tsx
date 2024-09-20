import { fetchUserOrders } from "@/app/lib/api/order";
import { OrderDto } from "@/app/lib/types/definition";
import { useEffect, useState } from "react";
import Pagination from "../lib/pagination";
import OrderItem from "./order-item";
import OrderListSkeleton from "../../skeleton/user/order-item";

interface UserOrderProps {
    token: string;
}

export default function UserOrder({token}: UserOrderProps) {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            const result = await fetchUserOrders(token, currentPage);
            setOrders(result.content);
            setTotalPages(result.page.totalPages);
            setLoading(false);
        }
        getOrders();
    }, [currentPage])

    if (loading) {
        return <div><OrderListSkeleton/></div>
    }

        return (
            <div>
                <div className="space-y-4">
                    {orders.map((order, index) => (
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
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                />
            </div>
        );

}