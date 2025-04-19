import { ReviewDto } from "@/app/lib/types/definition";
import Modal from "./modal";
import { useState } from "react";
import Image from "next/image";

interface ReviewProps {
    rating: number;
    totalReviews: number;
    reviews: ReviewDto[];
}

export default function ReviewImages({
    rating,
    totalReviews,
    reviews,
}: ReviewProps) {
    const [selectedReview, setSelectedReview] = useState<ReviewDto | null>(
        null
    );
    return (
        <div className="container mx-auto px-4">
            {/* 별점과 리뷰 수 */}
            <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-xl">
                    {"★".repeat(Math.floor(rating / totalReviews)) +
                        "☆".repeat(5 - Math.floor(rating / totalReviews))}
                </div>
                <div className="text-gray-600 ml-2">{totalReviews}개 리뷰</div>
            </div>

            {/* 이미지 슬라이더 */}
            <div className="flex space-x-2 overflow-x-auto">
                {reviews.map((review) => {
                    if (!review.imageUrls || review.imageUrls.length === 0)
                        return null;
                    return (
                        <img
                            key={review.id}
                            src={review.imageUrls[0]}
                            alt={review.comment}
                            className="w-40 h-40 object-cover rounded-md"
                            onClick={() => setSelectedReview(review)}
                        />
                    );
                })}
            </div>
            {selectedReview && (
                <Modal
                    isOpen={!!selectedReview}
                    onClose={() => setSelectedReview(null)}
                    imageUrls={selectedReview.imageUrls}
                    reviewDate={selectedReview.createdAt}
                    rating={selectedReview.rating}
                    comment={selectedReview.comment}
                />
            )}
        </div>
    );
}
