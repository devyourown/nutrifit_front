import React, { ReactNode, useState } from 'react';

interface FilterProps {
    onFilterChange: (category: string) => void;
}

export default function ProductFilter({ onFilterChange }: FilterProps) {
  const categories = [
    "All", "매운맛", "달콤한맛",
    "오리지널", "수비드 공법",
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onFilterChange(category);
  };

  return (
    <>
    <p className='text-xl'>상품 필터</p>
    <div className="p-4 bg-white shadow rounded-lg">
      <FilterSection title="카테고리">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`block w-full text-left px-3 py-2 mt-1 text-sm rounded-md ${selectedCategory === category ? 'bg-blue-500 text-white' : 'text-gray-700 bg-transparent'}`}
          >
            {category}
          </button>
        ))}
      </FilterSection>
    </div>
    </>
  );
}

const FilterSection = ({ title, children }: {title: string, children: ReactNode}) => {
    const [isOpen, setIsOpen] = useState(true);
  
    return (
      <div className="mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left flex justify-between items-center px-2 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-md"
        >
          {title}
          <span>{isOpen ? '-' : '+'}</span>
        </button>
        {isOpen && (
          <div className="mt-2 bg-gray-50 p-2 border border-gray-200 rounded-md">
            {children}
          </div>
        )}
      </div>
    );
  };