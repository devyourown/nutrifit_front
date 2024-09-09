// pages/contact.tsx or components/Contact.tsx
import React from 'react';

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center p-4 m-4">
      <div className="bg-white p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4">CONTACT</h1>
        <p className="text-sm text-gray-700 text-center">
          궁금한 점에 대한 질문이나 건의사항은 아래 연락처로 연락 주세요!
        </p>
        <div className="text-center mt-4">
          <a href="mailto:nutrifit@gmail.com" className="text-blue-500 hover:text-blue-700">
            nutrifit@gmail.com
          </a>
        </div>
        <p className="text-sm text-gray-700 text-center mt-2">
          Instagram: <a href="https://instagram.com/celebsonsandwiches" className="text-blue-500 hover:text-blue-700">
            @nutrifit
          </a>
        </p>
      </div>
    </div>
  );
};
