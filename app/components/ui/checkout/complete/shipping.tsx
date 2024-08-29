import { Orderer } from "@/app/lib/types/definition"

interface ShippingProps {
    orderer: Orderer
}

export default function Shipping({orderer}: ShippingProps) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">배송지 정보</h2>
            <p>
                <strong>받는 분:</strong> {orderer.recipientName}
            </p>
            <p>
                <strong>연락처:</strong> {orderer.recipientPhone}
            </p>
            <p>
                <strong>주소:</strong> {orderer.address}, {orderer.addressDetail}
            </p>
            <p>
                <strong>배송시 주의사항:</strong> {orderer.cautions}
            </p>
        </div>
    )
}