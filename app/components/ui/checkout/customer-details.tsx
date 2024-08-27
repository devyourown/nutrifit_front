import { Orderer } from "@/app/lib/types/definition";
import DetailForm from "./detail-form";
import DetailReview from "./detail-review";

interface CustomerDetailsProps {
    steps: number;
    orderer: Orderer;
    setSteps: (steps: number) => void;
}

export default function CustomerDetails({
    steps,
    orderer,
    setSteps
}: CustomerDetailsProps) {
    console.log(steps);
    return steps === 1 ? <DetailForm steps={steps} orderer={orderer} setSteps={setSteps}/> : <DetailReview steps={steps} orderer={orderer} setSteps={setSteps}/>;
}
