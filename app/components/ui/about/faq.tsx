"use client";

import FAQItem from './faq-item';


const FAQ: React.FC = () => {
  const faqData = {
    상품: [
        { question: "닭가슴살 제품은 어떻게 보관해야 하나요?", answer: "닭가슴살 제품은 받은 즉시 냉동 보관하시는 것이 가장 좋습니다." },
        { question: "닭가슴살 제품의 유통기한은 얼마나 되나요?", answer: "제품 포장에 명시된 유통기한을 확인하세요." },
        { question: "알레르기 정보가 궁금합니다.", answer: "모든 제품 설명에 알레르기 유발 성분을 명시하고 있습니다." },
      ],
      주문: [
        { question: "주문 취소하려면 어떻게 해야 하나요?", answer: "주문 취소는 주문 후 24시간 이내에 가능합니다." },
        { question: "주문한 제품을 변경하고 싶어요.", answer: "주문 변경은 주문 제작 상품의 경우 불가능할 수 있으니 주문 전 확인이 필요합니다." },
      ],
      배송: [
        { question: "배송 방법은 무엇인가요?", answer: "택배를 통해 안전하게 배송됩니다." },
        { question: "배송 기간은 얼마나 걸리나요?", answer: "일반적으로 주문 후 2-3일 내에 배송됩니다." },
        { question: "국제 배송이 가능한가요?", answer: "현재 국제 배송은 지원하지 않습니다." },
      ]
  };

  return (
    <div className="bg-white w-full">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-12">자주 묻는 질문</h1>
        {Object.entries(faqData).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-xl font-bold my-4">{category}</h2>
            {items.map((item, idx) => (
              <FAQItem key={idx} question={item.question} answer={item.answer} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
