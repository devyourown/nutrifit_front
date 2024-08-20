import React from "react";

export default function CustomerDetails() {
    return (
        <div className="w-full md:w-1/2 px-4 py-6">
            <h2 className="text-lg font-semibold mb-4">Customer details</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Email *
                    </label>
                    <input
                        type="email"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        First name *
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Last name *
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Phone *
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Country/Region *
                    </label>
                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                        <option>South Korea</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
            </form>
        </div>
    );
}
