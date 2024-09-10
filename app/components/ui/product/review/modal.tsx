import React, { useEffect, useRef, useState } from 'react';

interface ModalProps {
  isOpen: boolean;                  
  onClose: () => void;              
  imageUrls: string[];                 
  reviewDate: string;               
  rating: number;
  comment: string;
  mainImage?: string;
}


export default function Modal({ isOpen, onClose, imageUrls, reviewDate, rating, comment, mainImage }: ModalProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage || imageUrls[0]);
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();  // 모달 외부 클릭 시 onClose 핸들러 호출
      }
    };

    // 문서에 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-2xl w-full relative" ref={modalRef}>
        <button className="absolute text-4xl top-4 right-12 text-white" onClick={onClose}>×</button>
        <img src={selectedImage} alt="Selected" className="w-full h-auto rounded-md mb-4"/>
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-lg truncate">{comment}</span>
            <div className="text-sm text-gray-500">{reviewDate}</div>
          </div>
          <div>{"★".repeat(rating).padEnd(5, '☆')}</div>
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {imageUrls.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-20 h-20 object-cover cursor-pointer  ${img === selectedImage ? 'border-4 border-blue-500' : ''}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
