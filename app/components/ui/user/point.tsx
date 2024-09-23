import { fetchUserPoint } from "@/app/lib/api/point";
import { PointTransactionDto } from "@/app/lib/types/definition";
import useSWR from "swr";
import PointSkeleton from "../../skeleton/user/point";

interface PointProps {
    token: string;
}

export default function Point({token}: PointProps) {
    const { data: points, error } = useSWR(token ? `/points/${token}` : null, () => fetchUserPoint(token));

    if (error) return <div>포인트 정보를 불러오는 중 오류가 발생했습니다.</div>

    if (!points) return <div><PointSkeleton/></div>
    return (
        points ? <div>
            <h2 className="text-xl font-semibold mb-4">포인트</h2>
            <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                <div className="flex justify-between">
                    <span>현재 보유 포인트</span>
                    <span className="text-xl font-bold text-blue-500">{points.points.toLocaleString('ko-KR')}점</span>
                </div>
            </div>
            <div className="space-y-4">
                {points.transactions.map((point: PointTransactionDto, index: number) => (
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