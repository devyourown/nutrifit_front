import Image from "next/image";

interface SettingProps {
    name: string;
    email: string;
    profileImage: string;
}

export default function Setting({name, email, profileImage}: SettingProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">프로필 설정</h2>
            <div className="flex items-center mb-4">
                <Image
                    src={profileImage}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                />
                <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
                    이미지 변경
                </button>
            </div>
            <div>
                <label className="block text-gray-700 mb-2">이름</label>
                <input
                    type="text"
                    value={name}
                    className="w-full px-3 py-2 border rounded-lg mb-4"
                    placeholder="이름을 입력해 주세요."
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-2">이메일</label>
                <input
                    type="email"
                    value={email}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="이메일을 입력해 주세요."
                />
            </div>
        </div>
    );
}