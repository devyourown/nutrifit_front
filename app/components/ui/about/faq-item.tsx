import { useState } from "react";

interface FAQItemProps {
    question: string;
    answer: string;
  }

export default function FAQItem ({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border-b">
        <button
          className="w-full text-left p-4 font-semibold text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {question}
          <span className="float-right">{isOpen ? '−' : '▼'}</span>
        </button>
        {isOpen && <p className="p-4 text-gray-600">{answer}</p>}
      </div>
    );
  };