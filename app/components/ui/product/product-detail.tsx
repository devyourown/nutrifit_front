"use client";

import React, { useState } from "react";
import ProductImageCarousel from "./product-carousel";
import ProductOptions from "./product-options";
import { Option } from "@/app/lib/types/definition";
import { putItemInCart, triggerCartOpen } from "@/app/lib/trigger";

interface ProductDetailProps {
  imageUrls: string[];
  name: string;
  description: string;
  options: Option[];
  id: number;
}

export default function ProductDetail({imageUrls, name, description, options, id}: ProductDetailProps) {
  const [selectedOption, setSelectedOption] = useState(options![0]);
  const [loading, setLoading] = useState(false);

    const addToCart = async (productId: number) => {
        setLoading(true);
        const id = localStorage.getItem("id");
        const response = await putItemInCart(id!, productId, selectedOption.price, name + "(" + selectedOption.description + ")");
        if (response.ok) {
            triggerCartOpen();
        }
        setLoading(false);
    };

  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        {/* Image Carousel */}
        <div className="w-full md:w-1/2">
          <ProductImageCarousel images={imageUrls} />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <p className="text-gray-600 mb-4">{description}</p>
          
          <ProductOptions
            options={options!}
            onOptionChange={handleOptionChange}
          />

          <p className="text-2xl font-semibold text-pink-600 mt-6">
            {selectedOption.price.toLocaleString()}원
          </p>

          <div className="mt-6 flex space-x-4">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-pink-700 transition"
            onClick={() => addToCart(id)}
            disabled={loading}>
              장바구니 추가하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
