// components/ReviewModal.tsx
import { useState } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

interface ReviewModalProps {
    title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: string, images: File[], rating: number) => Promise<boolean>;
}

export default function ReviewModal({ title, isOpen, onClose, onSubmit }: ReviewModalProps) {
  const [review, setReview] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // 여러 파일을 배열로 변환하여 저장
    }
  };

  const handleReviewSubmit = async () => {
    if (review.length < 10) {
        alert('최소 열글자 이상의 리뷰를 적어주세요.');
        return;
    }
    setLoading(true);
    const result = await onSubmit(review, images, rating);
    if (result) {
        setReview('');
        setRating(5);
        onClose();
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <FaStar key={i} onClick={() => setRating(i)} 
          onDoubleClick={() => setRating(i-0.5)} className="text-yellow-400 text-3xl cursor-pointer" />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt key={i} onClick={() => setRating(i)} 
          onDoubleClick={() => setRating(i-0.5)} className="text-yellow-400 text-3xl cursor-pointer" />
        );
      } else {
        stars.push(
          <FaRegStar key={i} onClick={() => setRating(i)} 
          onDoubleClick={() => setRating(i-0.5)} className="text-yellow-400 text-3xl cursor-pointer" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">리뷰 작성하기</h2>
        <h2>상품명: {title}</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          placeholder="리뷰를 입력하세요"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">이미지 업로드</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="mt-2"
            onChange={handleImageUpload}
          />
          {images.length > 0 && (
            <p className="mt-2 text-sm text-gray-600">{images.length}개의 이미지가 선택되었습니다.</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">별점</label>
          <div className="flex space-x-1">{renderStars()}</div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose}>취소</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleReviewSubmit}> {loading ? '제출 중...' : '제출'}</button>
        </div>
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70">
            <ImSpinner2 className="text-blue-500 text-4xl animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};
