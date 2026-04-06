# HiAcademy 랜딩 웹 (React + TypeScript)

학원 관리 시스템 HiAcademy의 홍보·회원가입·결제 랜딩 페이지입니다.

## 기술 스택

- **Vite + React 18 + TypeScript**
- **React Router v6** — SPA 라우팅
- **Zustand** — 모달 상태 관리
- **Axios** — API 통신
- CSS Variables + 인라인 스타일 (별도 CSS 라이브러리 없음)

## 프로젝트 구조

```
src/
├── api/
│   └── client.ts          # Axios 클라이언트 + API 함수
├── components/
│   ├── Navbar.tsx          # 상단 네비게이션
│   ├── Footer.tsx          # 하단 푸터
│   └── AuthModal.tsx       # 회원가입/로그인 모달
├── pages/
│   ├── landing/
│   │   ├── index.tsx       # 랜딩 페이지 (섹션 조합)
│   │   ├── Hero.tsx        # 히어로 섹션
│   │   └── Sections.tsx    # Features/How/Pricing/FAQ/Contact/CTA
│   └── legal/
│       ├── LegalLayout.tsx # 법적 페이지 공통 레이아웃
│       ├── Privacy.tsx     # 개인정보처리방침
│       └── Terms.tsx       # 이용약관 + 환불정책
├── store/
│   └── modalStore.ts       # Zustand 모달 상태
├── styles/
│   └── global.css          # CSS 변수 + 공통 스타일
├── App.tsx                 # React Router 설정
└── main.tsx                # 진입점
```

## 라우팅

| URL | 컴포넌트 | 설명 |
|-----|---------|------|
| `/` | LandingPage | 메인 랜딩 (히어로·기능·요금제·후기·FAQ·문의) |
| `/privacy` | PrivacyPage | 개인정보처리방침 |
| `/terms` | TermsPage | 이용약관 |
| `/refund` | RefundPage | 환불정책 |

## 설치 및 실행

```bash
npm install
npm run dev       # http://localhost:3001
npm run build     # dist/ 폴더로 빌드
```

## Spring Boot 연동

`vite.config.ts` 에서 `/api` → `http://localhost:8080` 으로 프록시.

| 기능 | 엔드포인트 | 인증 |
|------|-----------|------|
| 회원가입 | POST /api/admin/auth/signup | 없음 |
| 로그인 | POST /api/admin/auth/login | 없음 |
| 도입 문의 저장 | POST /api/web/contact | 없음 |

## 배포

```bash
npm run build
# dist/ 폴더를 S3, Amplify, Netlify 등에 업로드
# SPA 라우팅을 위해 서버에서 모든 경로 → index.html 리다이렉트 설정 필요
```

### AWS Amplify 배포 시 (`amplify.yml`)
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands: [npm install]
    build:
      commands: [npm run build]
  artifacts:
    baseDirectory: dist
    files: ['**/*']
  cache:
    paths: [node_modules/**/*]
customHeaders:
  - pattern: '**/*'
    headers:
      - key: Cache-Control
        value: no-cache
```

### _redirects 파일 (Netlify)
```
/* /index.html 200
```
