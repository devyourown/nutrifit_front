"use client";

import React, { useState } from "react";
import ProductImageCarousel from "./product-carousel";
import ProductOptions from "./product-options";
import { ProductDetailDto, ProductDto } from "@/app/types/definition";

const productData = {
  name: "수비드 뉴트리핏 닭가슴살",
  description: "수비드 공법으로 제조된 뉴트리핏 닭가슴살",
  images: ["/sample1.jfif", "/sample2.jfif", "/sample3.jfif"],
  options: [
    { label: "10개", value: 10, price: 21000 },
    { label: "20개", value: 20, price: 42000 },
    { label: "30개", value: 30, price: 63000 },
  ],
};

interface ProductDetailProps {
  product: ProductDetailDto[];
}

export default function ProductDetail({product}: ProductDetailProps) {
  const [selectedOption, setSelectedOption] = useState(productData.options[0]);

  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        {/* Image Carousel */}
        <div className="w-full md:w-1/2">
          <ProductImageCarousel images={productData.images} />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{productData.name}</h1>
          <p className="text-gray-600 mb-4">{productData.description}</p>
          
          <ProductOptions
            options={productData.options}
            onOptionChange={handleOptionChange}
          />

          <p className="text-2xl font-semibold text-pink-600 mt-6">
            {selectedOption.price.toLocaleString()}원
          </p>

          <div className="mt-6 flex space-x-4">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-pink-700 transition">
              장바구니 추가하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
