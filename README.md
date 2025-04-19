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

git clone https://github.com/your-org/nutrifit-front.git
cd nutrifit-front

### 2. 의존성 설치

bash
npm install

### 3. 환경 변수 설정

.env.local 파일을 프로젝트 루트에 생성하고 다음 내용을 입력하세요:

env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/oauth/callback/google

## 🌐 백엔드 연동

Nutrifit Mall 프론트는 Spring Boot 기반의 백엔드와 REST API를 통해 통신합니다.

주요 API 예시:

상품 목록 조회: GET /products

로그인: POST /auth/login

주문 내역 조회: GET /orders

백엔드가 로컬에서 실행 중이어야 프론트에서도 정상 작동합니다. 자세한 백엔드 정보는 별도의 백엔드 레포를 참고해주세요.

## 🧠 Redis 연동 (장바구니)

Redis는 비회원 장바구니, 로그인 전 세션 데이터를 저장하는 데 사용됩니다.

프론트에서는 Redis에 직접 접근하지 않으며, API 호출을 통해 간접적으로 데이터를 관리합니다.

예시 API:

비회원 장바구니 저장: POST /cart/save

로그인 후 병합: POST /cart/merge

장바구니 조회: GET /cart

## 🧠 개발 팁

개발 서버 실행: npm run dev → http://localhost:3000

SWR을 활용한 상품 캐싱 적용

JWT는 localStorage에 저장되어 API 요청 시 헤더에 자동 포함

로그아웃 시: localStorage와 백엔드 세션 데이터(예: Redis)도 삭제됨

## ✅ 테스트 및 빌드

테스트를 만들지 못했습니다.

## 📁 주요 폴더 구조

- `components/` - 재사용 가능한 공통 UI 컴포넌트 (Header, Footer 등)
- `lib/` - API 요청, 유틸 함수, 헬퍼 함수 등 공통 로직
- `public/` - 정적 자산 (이미지, 폰트 등)
- `about/` - 회사 소개 및 브랜드 소개 페이지
- `nonmember/` - 비회원 주문 조회 및 비회원 관련 기능
- `login/` - 로그인 페이지 및 관련 로직
- `api/` - Next.js API 라우트 (백엔드와의 API 연동 아님)
- `auth/` - 인증 관련 로직 (OAuth 콜백 처리 등)
- `cart/` - 장바구니 페이지 및 장바구니 상태 관리
- `checkout/` - 주문 결제 페이지 및 결제 처리 로직
- `product/` - 상품 상세, 목록 페이지 및 상품 관련 로직
- `shop/` - 전체 상품 쇼핑 메인 페이지
- `signup/` - 회원가입 관련 페이지 및 로직
- `user/` - 마이페이지, 유저 정보, 주문 내역 등 유저 관련 기능

## 🧹 코드 스타일

- ESLint + Prettier 사용
- 커밋 전에 자동 포맷팅: `prettier --write .`
- 추천 확장 프로그램: ESLint, Prettier (VSCode)

## 🔐 보안 주의사항

- `.env.local` 파일은 절대 Git에 올리지 마세요.
- JWT 토큰은 `localStorage`에 저장되며, 민감한 API 요청 시 주의가 필요합니다.
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` 등 민감 정보는 환경 변수로 관리하세요.

## 🖼️ 데모 화면

| 메인 페이지                          | 상품 상세                               | 장바구니                                 | 결제 페이지                              |
| ------------------------------------ | --------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| ![메인](public/screenshots/main.png) | ![상품](public/screenshots/product.png) | ![장바구니](public/screenshots/cart.png) | ![결제](public/screenshots/checkout.png) |

## 🙋 문의사항

개발 관련 이슈나 문의는 Issues 탭을 통해 남겨주세요.
