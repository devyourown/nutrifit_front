import { useEffect, useState } from "react";
import { deleteReview, getUserReviews } from "@/app/lib/api/review"; // API 호출 함수 예시
import { ReviewDto } from "@/app/lib/types/definition";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Pagination from "../lib/pagination";
import ReviewSkeleton from "../../skeleton/user/review";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function UserReviews({ token }: { token: string }) {
    const [currentPage, setCurrentPage] = useState(0);

    // useSWR로 페이지 단위로 리뷰 불러오기
    const { data: reviewsResponse, error, mutate } = useSWR(
        token ? [`/reviews/${token}`, 'reviews', currentPage] : null,  // 고유한 SWR 키 사용
        () => getUserReviews(token, currentPage)
    );
    const reviews = reviewsResponse?.content;
    const totalPages = reviewsResponse?.totalPages;

    const handleDelete = async (reviewId: number) => {
        const confirmed = confirm("리뷰를 삭제하시겠습니까?");
        if (confirmed) {
            const response = await deleteReview(token, reviewId);
            if (response === '리뷰가 성공적으로 삭제되었습니다.') {
                console.log(response);
                mutate();
            }
        }
    };

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);  // 가득 찬 별
        const halfStar = rating % 1 >= 0.5;    // 반 별 여부
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);  // 빈 별

        return (
            <div className="flex">
                {/* 가득 찬 별 */}
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} className="text-yellow-500" />
                ))}
                {/* 반 별 */}
                {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
                {/* 빈 별 */}
                {[...Array(emptyStars)].map((_, i) => (
                    <FaRegStar key={`empty-${i}`} className="text-yellow-500" />
                ))}
            </div>
        );
    };

    if (!reviewsResponse && !error) {
        return <ReviewSkeleton />;
    }

    if (error) {
        return <div>리뷰를 불러오는 중 오류가 발생했습니다.</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">나의 리뷰</h2>
            {reviews.length > 0 ? (
                reviews.map((review: ReviewDto) => (
                    <div key={review.id} className="p-6 border rounded-lg bg-gray-50 mb-4">
                        {/* 리뷰 상단: 사용자 정보 및 평점 */}
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{review.username}</h3>
                                <p className="text-sm text-gray-500">작성일: {new Date(review.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center">
                                <span className="text-yellow-500 font-bold">{renderStars(review.rating)}</span>
                            </div>
                        </div>

                        {/* 리뷰 내용 */}
                        <p className="text-gray-700 mb-4">{review.comment}</p>

                        {/* 이미지 리스트 */}
                        {review.imageUrls.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {review.imageUrls.map((url, index) => (
                                    <div key={index} className="w-full h-32 bg-gray-100">
                                        <img
                                            src={url}
                                            alt={`리뷰 이미지 ${index + 1}`}
                                            className="object-cover w-full h-full rounded-md"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 수정 및 삭제 버튼 */}
                        <div className="flex justify-end space-x-2">
                            <button
                                className="text-red-500 hover:underline"
                                onClick={() => handleDelete(review.id)}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div>작성한 리뷰가 없습니다.</div>
            )}
            {/* 페이지네이션 */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
