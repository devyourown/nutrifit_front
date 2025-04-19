# 🛒 Nutrifit Mall - 프론트엔드

**Nutrifit Mall**은 건강식품 및 유기농 상품을 최저가에 제공하는 이커머스 플랫폼입니다. 이 저장소는 **프론트엔드(Next.js 기반)** 프로젝트이며, 백엔드(Spring Boot), Redis 등과 연동하여 사용자에게 빠르고 편리한 쇼핑 경험을 제공합니다.

---

## 📦 기술 스택

- **Framework**: Next.js (v13+)
- **Language**: TypeScript
- **UI**: TailwindCSS
- **상태 관리**: SWR, localStorage
- **이미지 최적화**: `next/image`
- **인증 방식**: Google OAuth + JWT
- **API 연동**: Spring Boot REST API
- **CACHE**: REDIS

---

## 🚀 시작하기

### 1. 레포지토리 클론

```bash
git clone https://github.com/your-org/nutrifit-front.git
cd nutrifit-front
2. 의존성 설치
bash
npm install
3. 환경 변수 설정
.env.local 파일을 프로젝트 루트에 생성하고 다음 내용을 입력하세요:

env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/oauth/callback/google
🌐 백엔드 연동
Nutrifit Mall 프론트는 Spring Boot 기반의 백엔드와 REST API를 통해 통신합니다.

주요 API 예시:

상품 목록 조회: GET /products

로그인: POST /auth/login

주문 내역 조회: GET /orders

백엔드가 로컬에서 실행 중이어야 프론트에서도 정상 작동합니다. 자세한 백엔드 정보는 별도의 백엔드 레포를 참고해주세요.

🧠 Redis 연동 (장바구니)
Redis는 비회원 장바구니, 로그인 전 세션 데이터를 저장하는 데 사용됩니다.

프론트에서는 Redis에 직접 접근하지 않으며, API 호출을 통해 간접적으로 데이터를 관리합니다.

예시 API:

비회원 장바구니 저장: POST /cart/save

로그인 후 병합: POST /cart/merge

장바구니 조회: GET /cart

🧠 개발 팁
개발 서버 실행: npm run dev → http://localhost:3000

SWR을 활용한 상품 캐싱 적용

JWT는 localStorage에 저장되어 API 요청 시 헤더에 자동 포함

로그아웃 시: localStorage와 백엔드 세션 데이터(예: Redis)도 삭제됨

✅ 테스트 및 빌드
bash
npm run lint     # ESLint 검사
npm run build    # 프로덕션 빌드
📁 주요 폴더 구조
csharp
.
├── components/       # 공통 UI 컴포넌트
├── pages/            # 라우팅 페이지
├── hooks/            # 커스텀 훅
├── lib/              # API, 유틸 함수 등
├── public/           # 정적 자산 (이미지 포함)
├── styles/           # Tailwind 등 글로벌 스타일
└── types/            # 타입 정의
🙋 문의사항
개발 관련 이슈나 문의는 Issues 탭을 통해 남겨주세요.
```
