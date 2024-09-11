
export interface QnAItemProps {
    question: string;
    questionDate: string;
    answer: string;
    answerDate: string;
}

export default function QnAItem({ question, questionDate, answer, answerDate }: QnAItemProps) {
    return (
        <div className="bg-white p-4 mb-4 shadow rounded-lg">
        <div className="bg-gray-100 p-4 rounded-lg">
        <p className="font-semibold">질문:</p>
          <div className="mb-2 flex flex-row justify-between">
            <p className="text-gray-600">{question}</p>
            <p className="text-gray-500 text-sm">{questionDate}</p>
          </div>
        </div>
        <div className="relative mt-4 bg-blue-50 p-4 rounded-lg text-gray-700">

        {answer ? (
          <>
            <div className="absolute top-0 left-5 -mt-2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-white"></div>
          <p className="font-semibold">답변:</p>
          <div className="mb-2 flex flex-row justify-between">
          <p>{answer}</p>
          <p className="text-gray-500 text-sm">{answerDate}</p>
          </div>
          </>
        ) : (
          <p className="text-gray-500 text-sm flex items-center">
            <span>답변이 아직 달리지 않았어요. 조금만 기다려 주세요.</span>
            <span className="text-2xl ml-2">🐶</span>
          </p>
        )}
        </div>
      </div>
    );
  };