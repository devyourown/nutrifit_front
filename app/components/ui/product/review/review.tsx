import React, { useEffect, useState } from "react";
import Pagination from "../../lib/pagination";
import { ReviewDto } from "@/app/lib/types/definition";
import { getProductReviews } from "@/app/lib/api/review";
import ReviewImages from "./images";
import ReviewDetail from "./detail";

interface ReviewProps {
  id: number;
  numOfReviews: number;
  rating: number;
}

export default function Review({id, numOfReviews, rating}: ReviewProps) {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [pageReviews, setPageReviews] = useState<ReviewDto[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadedReviewGroups, setLoadedReviewGroups] = useState<number[]>([0]);
  const reviewsPerPage = 6;
  const reviewsPerRequest = 60;

  useEffect(() => {
    const getReviews = async (id: number) => {
      setLoading(true);
      const response = await getProductReviews(id, 0);
      setReviews(response.content);
      setLoading(false);
    }
    getReviews(id);
  }, [id]);

  useEffect(() => {
    setPageReviews(reviews.slice(
      currentPage * reviewsPerPage,
      (currentPage + 1) * reviewsPerPage
    ));
  }, [currentPage, reviews]);


  // 페이지네이션 처리
  const handlePageChange = async (page: number) => {
    const currentGroup = Math.floor(page / (reviewsPerRequest / reviewsPerPage));
    
    // 페이지 그룹이 아직 로드되지 않았으면 데이터를 서버에서 가져옴
    if (!loadedReviewGroups.includes(currentGroup)) {
      const response = await getProductReviews(id, currentGroup);
      setReviews((prevReviews) => [...prevReviews, ...response.content]);
      setLoadedReviewGroups((prevGroups) => [...prevGroups, currentGroup]);
    }
    setCurrentPage(page);
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* 이미지 리뷰 영역 */}
      <div className="mx-auto my-4">
        <ReviewImages rating={rating} totalReviews={numOfReviews} reviews={reviews}/>
      </div>

      {/* 리뷰 리스트 영역 */}
      <div className="space-y-6">
        {pageReviews.map((review) => (
          <ReviewDetail key={review.id} review={review}/>
        ))}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(reviews.length / reviewsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
