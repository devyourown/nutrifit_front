"use client";

import { IoArrowBack, IoArrowForward } from "react-icons/io5";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {

    const handlePrevious = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage + 1 < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center items-center mt-6 space-x-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 0}
                className={`px-4 py-2 text-white font-semibold rounded-md 
                            ${currentPage === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} 
                            focus:outline-none transition`}
            >
                <IoArrowBack/>
            </button>

            <span className="text-gray-700 font-medium">
                {currentPage + 1}
            </span>

            <button
                onClick={handleNext}
                disabled={currentPage + 1 >= totalPages}
                className={`px-4 py-2 text-white font-semibold rounded-md 
                            ${currentPage + 1 >= totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} 
                            focus:outline-none transition`}
            >
                <IoArrowForward/>
            </button>
        </div>
    );
};
