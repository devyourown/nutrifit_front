import { Option } from "@/app/lib/types/definition";
import React, { useState } from "react";



type ProductOptionsProps = {
  options: Option[];
  onOptionChange: (option: Option) => void;
};

export default function ProductOptions ({
  options,
  onOptionChange,
}: ProductOptionsProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);
    onOptionChange(option);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">옵션 선택</h3>
      {options.map((option) => (
        <div
          key={option.price}
          className="flex items-center mb-2"
        >
          <input
            type="radio"
            id={`option-${option.price}`}
            name="product-option"
            value={option.price}
            checked={selectedOption.price === option.price}
            onChange={() => handleOptionChange(option)}
            className="mr-2"
          />
          <label htmlFor={`option-${option.price}`}>
            {option.quantity}개 - {option.price.toLocaleString()}원 ({option.description})
          </label>
        </div>
      ))}
    </div>
  );
};
