# MongoDB 회원가입/로그인 기능 구현 가이드

이 문서는 기존 프로젝트에 MongoDB를 활용한 회원가입/로그인 기능을 추가한 내역과, 관련 개념 및 설치 방법을 정리한 가이드입니다.

---

## 1. 추가/수정된 파일 목록

| 파일 경로 | 역할 |
|-----------|------|
| `lib/mongodb.ts` | MongoDB 연결 설정 (싱글톤 패턴) |
| `lib/models/User.ts` | User 모델(Mongoose 스키마) 정의 |
| `app/api/auth/signup/route.ts` | 회원가입 API (비밀번호 암호화, 중복 체크, JWT 발급) |
| `app/api/auth/login/route.ts` | 로그인 API (비밀번호 검증, JWT 발급) |
| `app/page.tsx` | 메인 페이지: 회원가입/로그인 폼 및 상태 관리 |
| `README.md` | 프로젝트 설명 및 사용법 추가 |


## 2. 설치한 라이브러리 및 명령어

```bash
npm install mongoose bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

- **mongoose**: MongoDB와 연결 및 데이터 모델링
- **bcryptjs**: 비밀번호 암호화
- **jsonwebtoken**: JWT 토큰 발급 및 검증
- **@types/bcryptjs, @types/jsonwebtoken**: TypeScript 타입 지원


## 3. 핵심 개념 요약

### 1) MongoDB 연결 (lib/mongodb.ts)
- 환경변수(`MONGODB_URI`)를 사용하여 데이터베이스 연결
- 개발환경에서 핫리로드 시 연결 중복 방지 (싱글톤 패턴)

### 2) User 모델 (lib/models/User.ts)
- 이메일, 비밀번호(암호화), 이름, 생성일자 필드
- 이메일 중복 방지(unique)

### 3) 회원가입 API (app/api/auth/signup/route.ts)
- 이메일/비밀번호/이름 입력값 검증
- 이메일 중복 체크
- 비밀번호 bcrypt로 암호화 후 저장
- JWT 토큰 발급 (회원가입 성공 시)

### 4) 로그인 API (app/api/auth/login/route.ts)
- 이메일로 사용자 조회
- bcrypt로 비밀번호 비교
- 일치 시 JWT 토큰 발급

### 5) 프론트엔드 (app/page.tsx)
- 회원가입/로그인 폼 UI
- 성공 시 JWT 토큰과 사용자 정보를 localStorage에 저장
- 로그인 상태 관리 및 로그아웃 기능


## 4. 환경변수 예시 (.env.local)

```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key-change-this-in-production
```


## 5. 실행 및 테스트 방법

1. 의존성 설치
    ```bash
    npm install
    ```
2. 환경변수 파일 생성 및 값 입력
3. 개발 서버 실행
    ```bash
    npm run dev
    ```
4. 브라우저에서 회원가입/로그인 테스트


## 6. 학습 포인트 (고등학생용)

- **비밀번호는 반드시 암호화해서 저장** (bcrypt)
- **JWT 토큰**으로 인증 상태를 관리 (세션/쿠키 대신)
- **환경변수**로 민감 정보 관리
- **에러 처리**와 사용자 친화적 메시지 제공

---

> 이 문서는 MongoDB 기반의 간단한 인증 시스템을 빠르게 구현하고, 핵심 개념을 학습하는 데 목적이 있습니다. 