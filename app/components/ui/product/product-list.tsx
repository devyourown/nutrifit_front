"use client";

import { ProductDto } from "@/app/lib/types/definition";
import Link from "next/link";

interface ProductListProps {
    products: ProductDto[];
}

export default function ProductList({ products }: ProductListProps) {
    return (
        <div className="flex flex-wrap justify-center space-x-4 p-4">
            {products.map((product) => {
                const discountPercentage = Math.round(
                    ((product.originalPrice - product.discountedPrice) /
                        product.originalPrice) *
                        100
                );

                return (
                    <div
                        key={product.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden w-80 flex flex-col m-2 transform transition-transform hover:scale-105 cursor-pointer"
                    >
                        <div className="relative">
                            <div className="absolute top-2 left-2 flex flex-wrap space-x-2 z-10">
                                {product.badgeTexts &&
                                    product.badgeTexts.map((text) => (
                                        <span
                                            key={text}
                                            className="bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-1"
                                        >
                                            {text}
                                        </span>
                                    ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between flex-grow p-4">
                            <Link href={`/product/${product.id}`}>
                                <img
                                    src={product.imageUrls[0]}
                                    alt={product.name}
                                    className="w-full h-60 object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-500 mt-2 text-sm">
                                        {product.description}
                                    </p>
                                    <p className="text-gray-700 mt-2">
                                        {product.originalPrice && (
                                            <span className="line-through mr-2">
                                                {product.originalPrice.toLocaleString(
                                                    "ko-KR"
                                                )}
                                                원
                                            </span>
                                        )}
                                        <span className="text-pink-600 font-bold">
                                            {product.discountedPrice.toLocaleString(
                                                "ko-KR"
                                            )}
                                            원
                                        </span>
                                        <span className="text-sm text-green-500 font-bold ml-2">
                                            {discountPercentage}% 할인
                                        </span>
                                    </p>
                                    <div className="mt-2 flex items-center">
                                        <i className="fas fa-star text-yellow-500">
                                            ★{" "}
                                        </i>
                                        <span className="text-sm">
                                            {isNaN(
                                                product.reviewRating /
                                                    product.reviewCount
                                            )
                                                ? "첫 리뷰어가 되어 주세요"
                                                : (
                                                      product.reviewRating /
                                                      product.reviewCount
                                                  ).toFixed(1)}
                                        </span>
                                        <span className="text-gray-700 ml-2">
                                            {product.reviewCount === 0
                                                ? ""
                                                : "(" +
                                                  product.reviewCount.toLocaleString(
                                                      "ko-KR"
                                                  ) +
                                                  ")"}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
