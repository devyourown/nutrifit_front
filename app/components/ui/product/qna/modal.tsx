import React, { useState } from 'react';

interface QnAModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  onSubmit: (question: string) => void; // 제출시 동작할 콜백 함수
}

export default function QnAModal({ isOpen, onClose, productName, onSubmit }: QnAModalProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = () => {
    if (question.trim() === '') {
      alert('문의 내용을 입력해주세요.');
      return;
    }
    onSubmit(question);  // 부모 컴포넌트에 제출된 내용을 전달
    onClose();  // 모달을 닫음
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">QNA 문의하기</h2>
        <div className="mb-4">
          <label className="block font-semibold">상품 이름</label>
          <input
            type="text"
            value={productName}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">문의 내용</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            rows={4}
            placeholder="문의 내용을 입력하세요."
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
};
