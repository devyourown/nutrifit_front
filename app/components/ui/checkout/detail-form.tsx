import { addOrdererToCart } from "@/app/lib/trigger";
import { Orderer } from "@/app/lib/types/definition";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

interface DetailFormProps {
    steps: number;
    orderer: Orderer;
    setSteps: (steps: number) => void;
    setOrderer: (orderer: Orderer) => void;
}

export default function DetailForm({steps, orderer, setSteps, setOrderer}: DetailFormProps) {
    const router = useRouter();
    const openPostCode = useDaumPostcodePopup();
    function handleAddress() {
        function handleComplete(data: any) {
            setFormData({
                ...formData,
                address: data.roadAddress,
            });
        }
        openPostCode({ onComplete: handleComplete });
    }
    const [sameAsOrderer, setSameAsOrderer] = useState(false);
    const [formData, setFormData] = useState({
        ordererName: orderer && orderer.ordererName || "",
        ordererPhone: orderer && orderer.ordererPhone || "",
        recipientName: orderer && orderer.recipientName || "",
        recipientPhone: orderer && orderer.recipientPhone || "",
        address: orderer && orderer.address || "",
        addressDetail: orderer && orderer.addressDetail || "",
        cautions: orderer && orderer.cautions || "",
    });

    const handleInputChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleCheckboxChange = (e: any) => {
        const isChecked = e.target.checked;
        setSameAsOrderer(e.target.checked);
        if (isChecked) {
            setFormData({
                ...formData,
                recipientName: formData.ordererName,
                recipientPhone: formData.ordererPhone,
            });
        }
    };

    const handleContinue = async (e: any) => {
        e.preventDefault();
        const userId = localStorage.getItem('id');
        if (!userId) {
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
            router.push('/');
            return;
        }
        const orderer: Orderer = {
            ordererName: formData.ordererName,
            ordererPhone: formData.ordererPhone,
            recipientName: formData.recipientName,
            recipientPhone: formData.recipientPhone,
            address: formData.address,
            addressDetail: formData.addressDetail,
            cautions: formData.cautions
        }
        setOrderer(orderer);
        const response = await addOrdererToCart(userId, orderer);
        if (!response.ok) {
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
            router.push('/');
            return;
        }
        setSteps(steps+1);
    };
    return (
        <form onSubmit={handleContinue}>
            <h3 className="text-xl font-semibold mb-4">주문자 정보</h3>
            <div className="mb-4">
                <label className="block text-gray-700">성함</label>
                <input
                    type="text"
                    name="ordererName"
                    value={formData.ordererName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="주문자 성함을 입력해 주세요."
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">연락처</label>
                <input
                    type="text"
                    name="ordererPhone"
                    value={formData.ordererPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="주문자 연락처를 입력해 주세요."
                    required
                />
            </div>
            <h3 className="text-xl font-semibold mb-4">배송지 정보</h3>
            <div className="mb-4">
                <label className="block text-gray-700">
                    <input
                        type="checkbox"
                        checked={sameAsOrderer}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                    />
                    주문자 정보와 동일
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">받는분 성함</label>
                <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="받는분 성함을 입력해 주세요."
                    required
                    disabled={sameAsOrderer}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">받는분 연락처</label>
                <input
                    type="text"
                    name="recipientPhone"
                    value={formData.recipientPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="받는 분 연락처를 입력해 주세요."
                    disabled={sameAsOrderer}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">주소</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onClick={handleAddress}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="주소를 입력해 주세요."
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">상세 주소</label>
                <input
                    type="text"
                    name="addressDetail"
                    value={formData.addressDetail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="상세 주소를 입력해 주세요."
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">배송시 주의사항</label>
                <input
                    type="text"
                    name="cautions"
                    value={formData.cautions}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="부재시 문앞 배송 | 현관 비밀번호"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
                저장하고 결제로 넘어가기
            </button>
        </form>
    );
}
