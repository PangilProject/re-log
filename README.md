# Re-Log

Re-Log는 마크다운을 사용하여 회고를 작성하고 관리할 수 있도록 설계된 웹 애플리케이션입니다. 사용자는 자신의 회고를 쉽게 생성, 조회, 수정 및 삭제할 수 있습니다.

## ✨ 주요 기능

- **🔐 사용자 인증**: 안전한 이메일/비밀번호 기반 회원가입 및 로그인 시스템
- **✍️ 마크다운 에디터**: 마크다운을 지원하는 에디터로 회고를 작성하고 실시간으로 미리보기
- **📝 회고 CRUD**: 회고 기록을 생성, 조회, 수정 및 삭제하는 기능
- **📋 목록 및 필터링**: 작성된 회고 목록을 확인하고 필터링하는 기능
- **🔥 Firebase 연동**: Firebase의 Firestore 및 Authentication을 활용한 백엔드 처리

## 🛠️ 기술 스택

- **Frontend**: Svelte (v5), SvelteKit
- **Styling**: Tailwind CSS
- **Backend & Database**: Firebase (Authentication, Firestore)
- **Language**: TypeScript
- **Bundler**: Vite
- **Code Quality**: ESLint, Prettier

## 🚀 시작 가이드

### 1. 프로젝트 클론

```bash
git clone https://github.com/pangil5634/re-log.git
cd re-log
```

### 2. 의존성 설치

```bash
npm install
```

### 3. Firebase 설정

1.  Firebase 콘솔에서 새 프로젝트를 생성합니다.
2.  웹 앱을 추가하고 Firebase SDK 설정 정보를 복사합니다.
3.  프로젝트 루트에 `.env` 파일을 생성하고 아래와 같이 Firebase 구성 변수를 추가합니다.

```
VITE_FB_API_KEY=your_api_key
VITE_FB_AUTH_DOMAIN=your_auth_domain
VITE_FB_PROJECT_ID=your_project_id
VITE_FB_STORAGE_BUCKET=your_storage_bucket
VITE_FB_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FB_APP_ID=your_app_id
```

`src/lib/firebase.ts` 파일이 이 환경 변수들을 사용하여 Firebase를 초기화합니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

애플리케이션은 `http://localhost:5173` 에서 실행됩니다.

## 📜 사용 가능한 스크립트

- `npm run dev`: 개발 모드에서 애플리케이션을 시작합니다.
- `npm run build`: 프로덕션용으로 애플리케이션을 빌드합니다.
- `npm run preview`: 빌드된 애플리케이션을 로컬에서 미리 봅니다.
- `npm run check`: Svelte 코드의 타입 체크를 실행합니다.
- `npm run lint`: ESLint와 Prettier를 사용하여 코드 스타일을 검사합니다.
- `npm run format`: Prettier를 사용하여 전체 코드베이스의 서식을 맞춥니다.
