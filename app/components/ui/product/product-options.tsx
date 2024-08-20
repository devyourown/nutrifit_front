import React, { useState } from "react";

type Option = {
  label: string;
  value: number;
  price: number;
};

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
          key={option.value}
          className="flex items-center mb-2"
        >
          <input
            type="radio"
            id={`option-${option.value}`}
            name="product-option"
            value={option.value}
            checked={selectedOption.value === option.value}
            onChange={() => handleOptionChange(option)}
            className="mr-2"
          />
          <label htmlFor={`option-${option.value}`}>
            {option.label} - {option.price.toLocaleString()}원
          </label>
        </div>
      ))}
    </div>
  );
};
