import { Orderer } from "@/app/lib/types/definition";
import DetailForm from "./detail-form";
import DetailReview from "./detail-review";
import CustomerDetailsSkeleton from "../../skeleton/checkout/customer-details";

interface CustomerDetailsProps {
    steps: number;
    orderer: Orderer;
    setSteps: (steps: number) => void;
    setOrderer: (orderer: Orderer) => void;
}

export default function CustomerDetails({
    steps,
    setSteps,
    orderer,
    setOrderer
}: CustomerDetailsProps) {
    return steps === 1 ? <DetailForm steps={steps} orderer={orderer} setOrderer={setOrderer} setSteps={setSteps}/> : orderer ? <DetailReview steps={steps} orderer={orderer} setSteps={setSteps}/> : <CustomerDetailsSkeleton/>;
}
