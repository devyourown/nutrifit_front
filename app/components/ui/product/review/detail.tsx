import { ReviewDto } from "@/app/lib/types/definition";
import { useState } from "react";
import Modal from "./modal";
import { makeDate } from "@/app/lib/generator";

interface ReviewDetailProps {
    review: ReviewDto;
}

export default function ReviewDetail({ review }: ReviewDetailProps) {
    const [selectedReview, setSelectedReview] = useState<ReviewDto | null>(
        null
    );
    const [mainImage, setMainImage] = useState<string>();

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <div className="flex items-center mb-4">
                <div>
                    <div className="text-lg font-semibold">
                        {review.username}
                    </div>
                    <div className="text-gray-500">
                        {makeDate(review.createdAt)}
                    </div>
                </div>
            </div>
            <div className="text-yellow-400 text-sm mb-2">
                {"★".repeat(Math.floor(review.rating)) +
                    "☆".repeat(5 - Math.floor(review.rating))}
            </div>
            <div className="flex overflow-x-auto mb-4">
                {review.imageUrls &&
                    review.imageUrls.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Review ${index}`}
                            className="w-24 h-24 object-cover mr-2 rounded"
                            onClick={() => {
                                setSelectedReview(review);
                                setMainImage(image);
                            }}
                        />
                    ))}
            </div>
            <p className="text-gray-600">{review.comment}</p>
            {selectedReview && (
                <Modal
                    isOpen={!!selectedReview}
                    onClose={() => setSelectedReview(null)}
                    imageUrls={selectedReview.imageUrls}
                    reviewDate={selectedReview.createdAt}
                    rating={selectedReview.rating}
                    comment={selectedReview.comment}
                    mainImage={mainImage}
                />
            )}
        </div>
    );
}
