# Re-Log: 나를 위한 회고 기록 플랫폼

[![Re-Log: 나를 위한 회고 기록 플랫폼](./static/banner.png)](./static/banner.png)

**Re-Log**는 마크다운으로 생각을 정리하고, 감정을 기록하며, 성장의 발자취를 남길 수 있는 개인 맞춤형 회고 관리 서비스입니다. 복잡한 설정 없이 나만의 회고를 작성하고 관리하며 꾸준한 성장 습관을 만들어보세요.

## 기본 정보

<a href = "https://relog.shop">🔗 서비스 이용하러 가기</a>

<br>
<br>
<br>

## ✨ 핵심 기능

### 회고 관리 (CRUD)

- **마크다운 에디터**: `markdown-it`과 `prism.js`를 활용한 실시간 미리보기 및 코드 하이라이팅을 지원합니다.
- **다양한 회고 폼**: **KPT(Keep, Problem, Try)** 와 같이 구조화된 회고 폼을 제공하여 생각을 체계적으로 정리할 수 있습니다.
- **감정 기록**: 회고 작성 당시의 감정을 이모지로 선택하여 기록하고, 목록에서 한눈에 확인할 수 있습니다.
- **목록 관리**: 작성된 회고를 한 곳에서 모아보고, 카테고리별 필터링, 제목/내용 검색, 최신순/오래된순 정렬 기능을 제공합니다.
- **페이지네이션**: '더 불러오기' 버튼을 통해 회고 목록을 점진적으로 로딩하여 부드러운 사용자 경험을 제공합니다.

### 사용자 및 인증

- **안전한 인증**: Firebase Authentication을 기반으로 한 이메일/비밀번호 회원가입, 로그인, 비밀번호 재설정 기능을 제공합니다.
- **마이페이지**: 프로필 정보(이름, 직군)를 수정하고 안전하게 로그아웃할 수 있습니다.
- **접근 제어**: 로그인 상태에 따라 페이지 접근 권한을 명확히 분리하여 안정적인 사용 환경을 보장합니다.

### 공유 및 소통

- **회고 공유**: 작성한 회고를 고유 링크로 생성하여 외부에 손쉽게 공유할 수 있습니다.
- **피드백 시스템**: 서비스 개선을 위한 아이디어나 의견을 사용자가 직접 제출할 수 있는 창구를 마련했습니다.

### 관리자 기능

- **관리자 대시보드**: 사용자, 게시물, 피드백 현황을 차트로 시각화하여 제공합니다.
- **통합 관리**: 전체 사용자, 게시물, 피드백 목록을 조회하고 관리하는 관리자 전용 페이지를 제공합니다.

<br>
<br>
<br>

## 🗺️ 페이지 및 이동 경로

### Public (로그인 없이 접근 가능)

- `/`: 서비스의 첫인상을 결정하는 랜딩 페이지
- `/login`, `/register`, `/forgot-password`: 사용자 인증 관련 페이지
- `/share/[id]`: 외부 공유된 회고를 조회하는 페이지

### Private (로그인 후 접근 가능)

- `/list`: 나의 전체 회고 목록을 보고 관리하는 핵심 페이지
- `/write/[type]`: `KPT` 등 특정 타입의 새 회고를 작성하는 페이지
- `/detail/[id]`: 내 회고의 상세 내용을 확인하는 페이지
- `/modify/[id]`: 기존에 작성한 회고를 수정하는 페이지
- `/mypage`: 내 프로필 정보를 수정하는 페이지

### Admin (관리자만 접근 가능)

- `/manage/*`: 사용자, 게시물, 피드백 관리를 위한 관리자 전용 페이지

<br>
<br>
<br>

## 📁 프로젝트 구조

```
/src
├── /routes/ # SvelteKit의 파일 기반 라우팅
│   ├── /(public)/ # 비로그인 사용자용 레이아웃 그룹
│   ├── /(private)/ # 로그인 사용자용 레이아웃 그룹
│   └── /(admin)/ # 관리자용 레이아웃 그룹
│
├── /lib # 앱의 핵심 로직 및 재사용 모듈
│   ├── /components/ # UI를 구성하는 재사용 Svelte 컴포넌트
│   ├── /services/ # Firebase와 통신하는 비즈니스 로직
│   ├── /stores/ # 앱의 전역 상태 관리를 위한 Svelte 스토어
│   ├── /utils/ # 포맷팅, 유효성 검사 등 보조 유틸리티 함수
│   ├── /constants/ # 앱 전반에서 사용되는 상수 모음
│   └── /assets/ # 로고, 아이콘 등 정적 에셋
│
└── /app.html # 모든 페이지의 기본 HTML 템플릿
```

<br>
<br>
<br>

## 🛠️ 기술 스택

- **Core**: Svelte 5, SvelteKit, TypeScript, Vite
- **Backend**: Firebase (Authentication, Firestore)
- **Styling**: Tailwind CSS, `lucide-svelte` (아이콘)
- **Editor & Markdown**: `markdown-it`, `prism.js` (코드 하이라이팅), `DOMPurify` (XSS 방지)
- **State Management**: Svelte Stores
- **Testing**: Vitest (Unit/Component), Playwright (E2E)
- **Code Quality**: ESLint, Prettier
- **Libraries**: `date-fns` (날짜 포맷팅), `chart.js` (관리자 차트), `svelte-5-french-toast` (알림)

<br>
<br>
<br>

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

### 4. 개발 서버 실행

```bash
npm run dev
```

애플리케이션은 `http://localhost:5173` 에서 실행됩니다.

<br>
<br>
<br>

## 📜 사용 가능한 스크립트

- `npm run dev`: 개발 모드에서 애플리케이션을 시작합니다.
- `npm run build`: 프로덕션용으로 애플리케이션을 빌드합니다.
- `npm run preview`: 빌드된 애플리케이션을 로컬에서 미리 봅니다.
- `npm run check`: Svelte 코드의 타입 체크를 실행합니다.
- `npm run format`: Prettier를 사용하여 전체 코드의 서식을 맞춥니다.
- `npm run lint`: ESLint와 Prettier로 코드 스타일을 검사합니다.
- `npm run test`: Vitest를 사용하여 단위/컴포넌트 테스트를 실행합니다.
- `npm run test:e2e`: Playwright를 사용하여 E2E 테스트를 실행합니다.

<br>
<br>
<br>

## 참고 링크

**[0] 기획 단계**

- [MVP 기획서](https://www.notion.so/MVP-2a4dabfdf20a80b3bc7be4b1c9e982a0?pvs=21)

**[1] 데일리 스크럼 (Notion)**

- 총 `21개`의 스크럼 : <a href = "https://www.notion.so/2a1dabfdf20a800cb3a0f304d7e4d67d?pvs=21">보러가기</a>

**[2] 기술 블로그 (우테코 일지)**

- 총 `21개`의 포스트 : 우테코 일지 <a href = "https://pangil-log.tistory.com/category/%E2%9C%8D%F0%9F%8F%BB%20%ED%9A%8C%EA%B3%A0/%EC%9A%B0%ED%85%8C%EC%BD%94">보러가기</a>

**[3] 기술 블로그 (SvelteKit, firebase, CSS 등)**

- 총 `24개`의 포스트 : SvelteKit <a href = "https://pangil-log.tistory.com/category/%F0%9F%92%BB%20%EA%B0%9C%EB%B0%9C/%F0%9F%91%B7%20SveleteKit">보러가기</a>

- 총 `4개`의 포스트 : firebase <a href = "https://pangil-log.tistory.com/category/%F0%9F%92%BB%20%EA%B0%9C%EB%B0%9C/%F0%9F%94%A5%20Firebase">보러가기</a>

- 총 `1개`의 포스트 : CSS <a href = "https://pangil-log.tistory.com/category/%F0%9F%92%BB%20%EA%B0%9C%EB%B0%9C/%F0%9F%8C%88%20CSS">보러가기</a>
