interface WelcomeProps {
    profileImage: string;
    name: string;
}

export default function Welcome({profileImage, name}: WelcomeProps) {
    return (
        <div className="flex justify-center items-center mb-6">
                    <img
                        src={profileImage}
                        alt="Profile"
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold">안녕하세요, {name}님!</h1>
                    </div>
                </div>
    )
}