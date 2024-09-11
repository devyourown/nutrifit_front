interface ShippingProps {
    shippingDetails: string[];
    exchangeAndReturns: string[];
}

export default function Shipping({shippingDetails, exchangeAndReturns}: ShippingProps) {
    return (
        <div className="container mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg m-4">
            <h1 className="text-2xl font-bold mb-4">배송정보</h1>
            <hr className="border-t-4 border-gray-200 my-4" />
            <ul className="list-disc pl-5 space-y-2">
                {shippingDetails && shippingDetails.map((detail) => {
                    return <li key={detail}>{detail}</li>
                })}
            </ul>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg m-4">
            <h1 className="text-2xl font-bold mb-4">교환, 환불, A/S 안내</h1>
            <hr className="border-t-4 border-gray-200 my-4" />
            <ul className="list-disc pl-5 space-y-2">
                {exchangeAndReturns && exchangeAndReturns.map((detail) => {
                    return <li key={detail}>{detail}</li>
                })}
            </ul>
        </div>
        </div>
    )
}