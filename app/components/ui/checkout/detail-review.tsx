import { Orderer } from "@/app/lib/types/definition";

interface DetailReviewProps {
    orderer: Orderer;
}

export default function DetailReview({ orderer }: DetailReviewProps) {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Review your details</h3>
            <p>
                <strong>주문자:</strong> {orderer.ordererName}
            </p>
            <p>
                <strong>주문자 연락처:</strong> {orderer.phone}
            </p>
            <p>
                <strong>받는분:</strong> {orderer.recipientName}
            </p>
            <p>
                <strong>받는분 연락처:</strong> {orderer.recipientName}
            </p>
            <p>
                <strong>주소:</strong> {orderer.address}
            </p>
            <p>
                <strong>배송시 주의사항:</strong> {orderer.cautions}
            </p>
        </div>
    );
}
