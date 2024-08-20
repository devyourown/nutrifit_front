import { Cart } from "@/app/types/definition";

export default function CheckoutSummary() {
    return (
        <div className="w-full md:w-1/2 px-4 py-6 bg-gray-100 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Order summary</h2>
            <div className="mb-4">
                <div className="flex justify-between">
                    <div>
                        <img
                            src="/path-to-image.jpg"
                            alt="Product Image"
                            className="w-16 h-16 rounded-md"
                        />
                        <p>
                            backpack large | better together | colourblocking |
                            badminton blue
                        </p>
                        <p>Qty: 1</p>
                    </div>
                    <p className="text-gray-900">€64.95</p>
                </div>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter a promo code"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="flex justify-between mb-2">
                <p>Items</p>
                <p>€64.95</p>
            </div>
            <div className="flex justify-between mb-2">
                <p>Delivery</p>
                <p>€45.00</p>
            </div>
            <div className="flex justify-between font-semibold text-lg">
                <p>Total</p>
                <p>€109.95</p>
            </div>
        </div>
    );
}
