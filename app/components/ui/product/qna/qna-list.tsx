import { ProductQnADto } from "@/app/lib/types/definition";
import QnAItem, { QnAItemProps } from "./qna-item";

interface QnAListProps {
    items: ProductQnADto[];
  }

export default function QnAList({ items }: QnAListProps) {
    return (
      <div className="container mx-auto px-4">
        {items.map((item, index) => (
          <QnAItem key={index} {...item} />
        ))}
      </div>
    );
  };