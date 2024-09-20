import Image from "next/image";
import { useState } from "react";
import ReviewModal from "./review-modal";
import { makeDate } from "@/app/lib/generator";
import { useRouter } from "next/navigation";

interface OrderItemProps {
    token?: string;
    productId: number;
    title: string;
    price: number;
    quantity: number;
    imageUrl: string;
    fulfillment: string;
    orderDate: string;
}

export default function OrderItem({token, productId, title, price, quantity, imageUrl, fulfillment, orderDate}: OrderItemProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleReviewSubmit = async (review: string, images: File[], rating: number) => {
        const formData = new FormData();
        images.forEach((image) => {
            formData.append(`files`, image);
        });
        formData.append('token', token!);
        formData.append('productId', productId.toString());
        formData.append('review', review);
        formData.append('rating', rating.toString());
        try {
            const uploadResponse = await fetch('/api/reviews', {
                method: 'POST',
                body: formData,
            });
            const {success} = await uploadResponse.json();
            if (success) {
                alert('상품 리뷰가 등록되었습니다!');
                return true;
            }
            return false;
        } catch (error) {
            alert('이미지 업로드 중 실패하였습니다. 다시 시도해 주세요.');
            return false;
        }
      };

    return (
        <div className="bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4 bg-gray-100 p-4">
                <h2 className="text-lg font-bold">주문일 {makeDate(orderDate)}</h2>
                <button className="text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out">주문상세보기</button>
            </div>
            <div className="flex p-4">
                <div className="w-24 h-24 relative mr-4">
                    <Image src={imageUrl} alt="Product" layout="fill" objectFit="contain" />
                </div>
                <div className="flex-grow border-r border-gray-300" onClick={() => router.push(`/product/${productId}`)}>
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <p className="text-gray-600">{price.toLocaleString()}원 / {quantity}개</p>
                </div>
                <div className="flex flex-col space-y-2 pl-4">
                <p className="font-bold text-center text-lg mb-2">{fulfillment}</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-150 ease-in-out shadow">배송조회</button>
                    <button className="border-solid border-2 border-blue-400 hover:bg-gray-300 py-2 px-4 rounded transition duration-150 ease-in-out shadow"
                    onClick={() => setIsModalOpen(true)}>리뷰작성</button>
                    <button className="border-solid border-2 border-blue-400 hover:bg-gray-300 py-2 px-4 rounded transition duration-150 ease-in-out shadow">주문 취소</button>
                </div>
            </div>
            <ReviewModal
            title={title}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleReviewSubmit}/>
        </div>
    );
}