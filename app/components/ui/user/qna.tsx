import { useState } from "react";
import { deleteUserQna, fetchUserQna } from "@/app/lib/api/qna"; // API 호출 함수 예시
import { useRouter } from "next/navigation";
import { ProductQnADto } from "@/app/lib/types/definition";
import useSWR from "swr";
import QnASkeleton from "../../skeleton/user/qna";
import Pagination from "../lib/pagination";

export default function UserQnA({ token }: { token: string }) {
    const [currentPage, setCurrentPage] = useState(0);

    // useSWR로 QnA 데이터 가져오기
    const { data: qnaResponse, error, mutate } = useSWR(
        token ? [`/qna/${token}`, 'qna', currentPage] : null,  // 고유한 SWR 키 사용
        () => fetchUserQna(token, currentPage)
    );

    const qna = qnaResponse?.content;
    const totalPages = qnaResponse?.totalPages;

    const handleDelete = async (qnaId: number) => {
        const confirmed = confirm("Q&A를 삭제하시겠습니까?");
        if (confirmed) {
            const response = await deleteUserQna(token, qnaId);
            if (response === 'Q&A가 성공적으로 삭제되었습니다.') {
                console.log(response);
                mutate();
            }
        }
    };

    if (!qna && !error) return <QnASkeleton />; // 로딩 시 스켈레톤 표시
    if (error) return <div>Q&A를 불러오는 중 오류가 발생했습니다.</div>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">나의 Q&A</h2>
            {qna.length > 0 ? (
                qna.map((q: ProductQnADto) => (
                    <div key={q.id} className="p-6 border rounded-lg bg-gray-50 mb-4">
                        {/* 질문 */}
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">상품명 : {q.productName}</h3>
                            <p className="text-sm text-gray-500">질문 날짜: {new Date(q.questionDate).toLocaleDateString()}</p>
                            <p className="text-gray-700 mb-2">{q.question}</p>
                        </div>

                        {/* 답변이 있는 경우에만 표시 */}
                        {q.answer && (
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-blue-700">답변</h3>
                                <p className="text-sm text-gray-500">답변 날짜: {new Date(q.answerDate).toLocaleDateString()}</p>
                                <p className="text-gray-700 mb-2">{q.answer}</p>
                            </div>
                        )}

                        {/* 수정 및 삭제 버튼 */}
                        <div className="flex justify-end space-x-2">
                            <button className="text-red-500 hover:underline" onClick={() => handleDelete(q.id)}>
                                삭제
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div>작성한 Q&A가 없습니다.</div>
            )}
            <Pagination
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={setCurrentPage} 
                    />
        </div>
    );
}
