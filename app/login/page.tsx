"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();

    useEffect(() => {
        // 팝업 창에서 오는 메시지 처리
        const handleMessage = (event: MessageEvent) => {
            if (event.data.jwt) {
                router.push("/");
            } else if (event.data && event.data.code) {
                // 받은 code를 사용해 콜백 페이지로 리디렉션
                router.push(`/auth/callback/${event.data.provider}?code=${event.data.code}`);
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [router]);

    const handleOAuthLogin = (provider: string) => {
        let oauthUrl = "";
    
        switch (provider) {
          case "google":
            oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/callback/google&response_type=code&scope=email profile`;
            break;
          case "facebook":
            oauthUrl = `https://www.facebook.com/v11.0/dialog/oauth?client_id=YOUR_FACEBOOK_CLIENT_ID&redirect_uri=http://localhost:3000/auth/callback/facebook&response_type=code&scope=email`;
            break;
          case "naver":
            oauthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/callback/naver&response_type=code&scope=email profile`;
            break;
          default:
            break;
        }
    
        // 팝업으로 OAuth 인증 요청
        const popup = window.open(
          oauthUrl,
          "_blank",
          "width=500,height=600"
        );

        const checkPopup = setInterval(() => {
            if (!popup || popup.closed) {
                clearInterval(checkPopup);
            }
        }, 500);
      };
    const [showEmailForm, setShowEmailForm] = useState(false);

    const handleEmailSignin = () => {
        setShowEmailForm(true);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-6">로그인</h2>
                <p className="text-center text-gray-600 mb-4">
                    아직 회원이 아니신가요?{" "}
                    <Link
                        href="/signup"
                        className="text-blue-600 hover:underline"
                    >
                        회원가입
                    </Link>
                </p>

                {!showEmailForm && (
                    <>
                        <button className="flex items-center justify-center w-full p-2 mb-4 border border-gray-300 rounded-md hover:bg-gray-100"
                        onClick={() => handleOAuthLogin('google')}>
                            <img
                                src="/google_logo.svg"
                                alt="Google Logo"
                                className="w-5 h-5 mr-2"
                            />
                            구글 로그인
                        </button>

                        <button className="flex items-center justify-center w-full p-2 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                                alt="Facebook Logo"
                                className="w-5 h-5 mr-2"
                            />
                            페이스북 로그인
                        </button>

                        <button className="flex items-center justify-center w-full p-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600"
                        onClick={() => handleOAuthLogin("naver")}>
                            <img
                                src="/naver_logo.png"
                                alt="Naver Logo"
                                className="w-5 h-5 mr-2"
                            />
                            네이버 로그인
                        </button>

                        <div className="flex items-center justify-center my-4">
                            <div className="border-t border-gray-300 flex-grow mr-3"></div>
                            <span className="text-gray-500 font-semibold">
                                or
                            </span>
                            <div className="border-t border-gray-300 flex-grow ml-3"></div>
                        </div>

                        <button
                            onClick={handleEmailSignin}
                            className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900"
                        >
                            이메일로 로그인
                        </button>
                    </>
                )}

                {showEmailForm && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                이메일
                            </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                비밀번호
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="mb-4">
                            {/* reCAPTCHA placeholder */}
                            <div
                                className="g-recaptcha"
                                data-sitekey="your-site-key"
                            ></div>
                        </div>
                        <button className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900">
                            로그인
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
