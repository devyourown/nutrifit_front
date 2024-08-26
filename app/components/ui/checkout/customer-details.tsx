import { Orderer } from "@/app/lib/types/definition";
import DetailForm from "./detail-form";
import DetailReview from "./detail-review";

interface CustomerDetailsProps {
    steps: number;
    orderer: Orderer;
}

export default function CustomerDetails({
    steps,
    orderer,
}: CustomerDetailsProps) {
    return steps === 1 ? <DetailForm /> : <DetailReview orderer={orderer} />;
}
