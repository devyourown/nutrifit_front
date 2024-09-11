"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ProductDetailDto } from '@/app/lib/types/definition';
import Review from './review/review';
import QnA from './qna/qna';
import { AuthProvider } from '@/app/lib/use-auth';

interface ProductDetailProps {
    id: number;
    detail: ProductDetailDto;
    rating: number;
    numOfReviews: number;
    productName: string;
}

export default function ProductDetailPage({id, detail, rating, numOfReviews, productName}: ProductDetailProps) {
    const [activeTab, setActiveTab] = useState('info');

    const infoRef = useRef<HTMLDivElement>(null);
    const reviewsRef = useRef<HTMLDivElement>(null);
    const qnaRef = useRef<HTMLDivElement>(null);
    const shippingRef = useRef<HTMLDivElement>(null);

    const handleScrollToSection = (section: string) => {
        setActiveTab(section);
        const sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
            info: infoRef,
            reviews: reviewsRef,
            qna: qnaRef,
            shipping: shippingRef,
        };

        const selectedRef = sectionRefs[section];
        if (selectedRef.current) {
            window.scrollTo({
                top: selectedRef.current.offsetTop - 100, // Adjust this offset for your sticky header height
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections: { [key: string]: React.RefObject<HTMLDivElement> } = {
                info: infoRef,
                reviews: reviewsRef,
                qna: qnaRef,
                shipping: shippingRef,
            };

            const sectionKeys = Object.keys(sections) as (keyof typeof sections)[];

            for (let key of sectionKeys) {
                const ref = sections[key];
                if (ref.current) {
                    const rect = ref.current.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveTab(key as string);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <div className="sticky top-0 bg-white z-30 border-b border-gray-300">
                    <nav className="flex px-4 justify-between py-4 text-xl">
                        <button
                            onClick={() => handleScrollToSection('info')}
                            className={`pb-2 transition ${
                                activeTab === 'info' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-500'
                            }`}
                        >
                            상품 정보
                        </button>
                        <button
                            onClick={() => handleScrollToSection('reviews')}
                            className={`pb-2 transition ${
                                activeTab === 'reviews' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-500'
                            }`}
                        >
                            리뷰
                        </button>
                        <button
                            onClick={() => handleScrollToSection('qna')}
                            className={`pb-2 transition ${
                                activeTab === 'qna' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-500'
                            }`}
                        >
                            Q&A
                        </button>
                        <button
                            onClick={() => handleScrollToSection('shipping')}
                            className={`pb-2 transition ${
                                activeTab === 'shipping' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-500'
                            }`}
                        >
                            배송/보관
                        </button>
                    </nav>
                </div>

                <div className="mt-6 space-y-16">
                    <div ref={infoRef}>
                        <h3 className="text-2xl text-center font-semibold mb-4">상품 정보</h3>
                        <div className="space-y-4">
                            {detail.detailImageUrls.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    alt={`Product detail ${index + 1}`}
                                    width={800}
                                    height={800}
                                    className="w-full"
                                />
                            ))}
                        </div>
                    </div>

                    <div ref={reviewsRef}>
                        <h3 className="text-2xl font-semibold mb-4">리뷰</h3>
                        <Review id={id} numOfReviews={numOfReviews} rating={rating}/>
                    </div>

                    <div ref={qnaRef}>
                        <AuthProvider>
                        <QnA qnas={detail.qnas} productId={id} productName={productName}/>
                        </AuthProvider>
                    </div>

                    <div ref={shippingRef}>
                        <h3 className="text-2xl font-semibold mb-4">배송/보관</h3>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">배송 정보</h4>
                            <p>{detail.shippingMethod}</p>
                            <h4 className="font-semibold mt-4 mb-2">보관 정보</h4>
                            <p>{detail.shippingDuration}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
