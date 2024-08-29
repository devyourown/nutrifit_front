interface CompletePaymentProps {
    method: string;
    id: string;
    date: string;
}

export default function Payment({id, date, method}: CompletePaymentProps) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">결제 정보</h2>
            <p>
                <strong>결제 방법:</strong> {method}
            </p>
            <p>
                <strong>결제 ID:</strong> {id}
            </p>
            <p>
                <strong>결제 일시:</strong> {date}
            </p>
        </div>
    )
}