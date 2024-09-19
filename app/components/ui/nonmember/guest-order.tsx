"use client";

import { fetchNonMemberOrder } from '@/app/lib/api/order';
import { OrderDto } from '@/app/lib/types/definition';
import { useState } from 'react';

const GuestOrder = () => {
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [orders, setOrders] = useState<OrderDto[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber) {
      setError('Order number is required.');
      return;
    }
    setError(null);

    const order: OrderDto[] = await fetchNonMemberOrder(orderNumber);
    console.log(order);
    setOrders(order);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">비회원 주문 조회</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
              주문번호를 입력해 주세요
            </label>
            <input
              type="text"
              id="orderNumber"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. payment-12345678"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            조회하기
          </button>
        </form>

        {/* 주문 정보가 있을 경우에만 보여줍니다. */}
        {orders &&
            orders.map((order, index) => {
                return (
                    <div className="mt-8 bg-gray-50 p-4 rounded-md shadow-md" key={index}>
            <h2 className="text-lg font-semibold text-gray-800">주문 상세</h2>
            <p className="text-gray-700">
              <strong>주문번호: </strong> {order.id}
            </p>
            <p className="text-gray-700">
              <strong>주문날짜: </strong> {order.orderDate}
            </p>
            <p className="text-gray-700">
              <strong>주문상태:</strong> {order.fulfillment}
            </p>
            <p className="text-gray-700">
              <strong>운송장번호:</strong> {order.trackingNumber}
            </p>
            <p className="text-gray-700">
              <strong>상품이름:</strong> {order.productName}
            </p>
            <p className="text-gray-700">
              <strong>총 가격:</strong> {order.totalAmount}
            </p>
          </div>
                )
            })
        }
      </div>
    </div>
  );
};

export default GuestOrder;
