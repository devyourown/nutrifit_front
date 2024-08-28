import { fetchUserPoint } from "@/app/lib/api/point";
import { PointDto } from "@/app/lib/types/definition";
import { useEffect, useState } from "react";

interface PointProps {
    token: string;
}

export default function Point({token}: PointProps) {
    const [point, setPoint] = useState<PointDto>();
    useEffect(() => {
        const getPoint = async () => {
            const result = await fetchUserPoint(token);
            setPoint(result);  
        }
        getPoint();
    }, []);
    return (
        point ? <div>
            <h2 className="text-xl font-semibold mb-4">포인트</h2>
            <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                <div className="flex justify-between">
                    <span>현재 보유 포인트</span>
                    <span className="text-xl font-bold text-blue-500">{point.points.toLocaleString('ko-KR')}점</span>
                </div>
            </div>
            <div className="space-y-4">
                {point.transactions.map((point, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between">
                            <span>{point.description}</span>
                            <span className="font-bold">{point.point.toLocaleString('ko-KR')}점</span>
                        </div>
                        <p className="text-sm text-gray-500">소멸 예정일: {point.whenToBurn}</p>
                    </div>
                ))}
            </div>
        </div> : <div>보유 포인트가 없습니다.</div>
    );
}