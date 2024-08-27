import { changeCheckoutStep } from "@/app/lib/trigger";
import { Orderer } from "@/app/lib/types/definition";
import { useRouter } from "next/navigation";

interface DetailReviewProps {
    orderer: Orderer;
    steps: number;
    setSteps: (steps: number) => void;
}

export default function DetailReview({ orderer, steps,setSteps }: DetailReviewProps) {
    const router = useRouter();
    const lowerSteps = async () => {
        const userId = localStorage.getItem('id');
        if (!userId) {
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
            router.push('/');
            return;
        }
        const response = await changeCheckoutStep(userId, steps-1);
        if (!response.ok) {
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
            router.push('/');
            return;
        }
        setSteps(steps-1);
    }
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">주문 정보를 확인해 주세요.</h3>
            <p>
                <strong>주문자:</strong> {orderer.ordererName}
            </p>
            <p>
                <strong>주문자 연락처:</strong> {orderer.ordererPhone}
            </p>
            <p>
                <strong>받는분:</strong> {orderer.recipientName}
            </p>
            <p>
                <strong>받는분 연락처:</strong> {orderer.recipientPhone}
            </p>
            <p>
                <strong>주소:</strong> {orderer.address + " " + orderer.addressDetail}
            </p>
            <p>
                <strong>배송시 주의사항:</strong> {orderer.cautions}
            </p>
            <p>
        <a className="text-blue-600 hover:underline" onClick={() => lowerSteps()}>
            다시 입력하기
        </a>
    </p>
        </div>
    );
}
