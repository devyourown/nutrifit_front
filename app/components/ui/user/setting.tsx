import Image from "next/image";

interface SettingProps {
    profileImage: string;
}

export default function Setting({profileImage}: SettingProps) {
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
        </div>
    );
}