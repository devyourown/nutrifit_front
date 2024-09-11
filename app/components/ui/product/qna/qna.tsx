import { ProductQnADto } from "@/app/lib/types/definition";
import QnAList from "./qna-list";
import { useAuth } from "@/app/lib/use-auth";
import { useRouter } from "next/navigation";
import QnAModal from "./modal";
import { useState } from "react";
import { makeQnA } from "@/app/lib/api/qna";

interface QnAProps {
    qnas: ProductQnADto[];
    productId: number;
    productName: string;
}

export default function QnA({qnas, productId, productName}: QnAProps) {
    const {isLoggedIn, token } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);
    const router = useRouter();

    const handleMakeQuestion = () => {
        if (!isLoggedIn) {
            router.push(`/login?replace=/product/${productId}`);
        } else {
            setModalOpen(true);
        }
    };

    const handleQnASubmit = async (question: string) => {
        const response = await makeQnA(token!, productId, question);
        if (response && response.ok) {
            alert('문의가 완료 되었습니다.');
        } else {
            alert('로그인 정보가 없습니다. 로그인 후 다시 시도해주세요.');
            router.push(`/login?replace=/product/${productId}`);
        }
    }

    return (
        <>
        <div className='flex flex-row justify-between'>
            <h3 className="text-2xl font-semibold mb-4">Q&A</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleMakeQuestion}>문의하기</button>
        </div>
        <QnAList items={qnas}/>
        <QnAModal isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        productName={productName}
        onSubmit={handleQnASubmit}
        />
        </>
    )
}