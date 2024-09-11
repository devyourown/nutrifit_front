import { generateUniqueId } from "./generator";

export const handleOAuthLogin = (provider: string) => {
    let oauthUrl = "";

    switch (provider) {
        case "google":
            oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}/auth/callback/google&response_type=code&scope=email profile`;
            break;
        case "naver":
            const randomState = generateUniqueId();
            const encodedState = encodeURIComponent(randomState);
            oauthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&state=${encodedState}&redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}/auth/callback/naver&response_type=code&scope=email profile`;
            break;
        case "kakao":
            oauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}/auth/callback/kakao&response_type=code`;
            break;
        default:
            break;
    }

    // 팝업으로 OAuth 인증 요청
    const popup = window.open(oauthUrl, "_blank", "width=500,height=600");

    const checkPopup = setInterval(() => {
        if (!popup || popup.closed) {
            clearInterval(checkPopup);
        }
    }, 500);
};
