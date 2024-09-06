/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // 특정 경로에만 Cross-Origin-Opener-Policy를 설정
                source: "/lib/auth", // 팝업을 여는 경로 또는 부모 페이지의 경로
                headers: [
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin",
                    },
                    {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "require-corp",
                    },
                ],
            },
            {
                // 특정 경로에만 Cross-Origin-Opener-Policy를 설정
                source: "/auth/callback/:path*", // 팝업을 여는 경로 또는 부모 페이지의 경로
                headers: [
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin",
                    },
                    {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "require-corp",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
