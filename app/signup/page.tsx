"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
    const [showEmailForm, setShowEmailForm] = useState(false);

    const handleEmailSignup = () => {
        setShowEmailForm(true);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-6">
                    회원가입
                </h2>
                <p className="text-center text-gray-600 mb-4">
                    이미 회원이신가요?{" "}
                    <Link
                        href="/login"
                        className="text-blue-600 hover:underline"
                    >
                        로그인하기
                    </Link>
                </p>

                {!showEmailForm && (
                    <>
                        <button className="flex items-center justify-center w-full p-2 mb-4 border border-gray-300 rounded-md hover:bg-gray-100">
                            <img
                                src="/google_logo.svg"
                                alt="Google Logo"
                                className="w-5 h-5 mr-2"
                            />
                            구글로 회원가입
                        </button>

                        <button className="flex items-center justify-center w-full p-2 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                                alt="Facebook Logo"
                                className="w-5 h-5 mr-2"
                            />
                            페이스북으로 회원가입
                        </button>

                        <button className="flex items-center justify-center w-full p-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600">
                            <img
                                src="/naver_logo.png"
                                alt="Naver Logo"
                                className="w-5 h-5 mr-2"
                            />
                            네이버로 회원가입
                        </button>

                        <div className="flex items-center justify-center my-4">
                            <div className="border-t border-gray-300 flex-grow mr-3"></div>
                            <span className="text-gray-500 font-semibold">
                                or
                            </span>
                            <div className="border-t border-gray-300 flex-grow ml-3"></div>
                        </div>

                        <button
                            onClick={handleEmailSignup}
                            className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900"
                        >
                            이메일로 회원가입
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
                            회원가입
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
