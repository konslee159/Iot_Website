import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Next.js 15 파일 기반 라우팅 가이드
        </h1>

        <div className="grid gap-8">
          {/* App Router 소개 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">App Router (Next.js 13+)</h2>
            <p className="text-gray-600 mb-4">
              Next.js 13부터 도입된 App Router는 React Server Components를 기반으로 한 새로운 라우팅 시스템입니다.
              <code className="bg-gray-100 px-2 py-1 rounded mx-1">app</code> 디렉토리를 사용하여 파일 기반 라우팅을 구현합니다.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-blue-800">
                <strong>주요 장점:</strong> 서버 컴포넌트, 향상된 성능, 더 나은 SEO, 스트리밍 지원
              </p>
            </div>
          </section>

          {/* 예약 파일들 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">예약 파일 (Reserved Files)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* page.tsx */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-green-700">page.tsx</h3>
                <p className="text-sm text-gray-600 mb-2">라우트의 UI를 정의하는 파일</p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  app/page.tsx → /
                  <br />
                  app/about/page.tsx → /about
                  <br />
                  app/blog/[slug]/page.tsx → /blog/post-1
                </div>
              </div>

              {/* layout.tsx */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">layout.tsx</h3>
                <p className="text-sm text-gray-600 mb-2">여러 페이지에서 공유되는 UI 레이아웃</p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  app/layout.tsx → 루트 레이아웃
                  <br />
                  app/dashboard/layout.tsx → 대시보드 레이아웃
                </div>
              </div>

              {/* route.ts */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-purple-700">route.ts</h3>
                <p className="text-sm text-gray-600 mb-2">API 엔드포인트를 정의하는 파일</p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  app/api/users/route.ts → /api/users
                  <br />
                  app/api/posts/[id]/route.ts → /api/posts/123
                </div>
              </div>

              {/* loading.tsx */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-yellow-700">loading.tsx</h3>
                <p className="text-sm text-gray-600 mb-2">로딩 상태를 보여주는 UI</p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  app/loading.tsx → 전역 로딩
                  <br />
                  app/dashboard/loading.tsx → 대시보드 로딩
                </div>
              </div>

              {/* error.tsx */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-red-700">error.tsx</h3>
                <p className="text-sm text-gray-600 mb-2">에러 상태를 처리하는 UI</p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  app/error.tsx → 전역 에러 처리
                  <br />
                  app/dashboard/error.tsx → 대시보드 에러
                </div>
              </div>

              {/* not-found.tsx */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">not-found.tsx</h3>
                <p className="text-sm text-gray-600 mb-2">404 페이지를 정의하는 파일</p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  app/not-found.tsx → 전역 404
                  <br />
                  app/blog/not-found.tsx → 블로그 404
                </div>
              </div>
            </div>
          </section>

          {/* 라우팅 규칙 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">라우팅 규칙</h2>
            <div className="space-y-4">
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-green-700">정적 라우트</h3>
                <p className="text-sm text-gray-600">폴더 이름이 URL 경로가 됩니다.</p>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/about/page.tsx → /about</code>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-blue-700">동적 라우트</h3>
                <p className="text-sm text-gray-600">대괄호로 감싼 폴더명은 동적 세그먼트가 됩니다.</p>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/blog/[slug]/page.tsx → /blog/my-post</code>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-purple-700">Catch-all 라우트</h3>
                <p className="text-sm text-gray-600">여러 세그먼트를 한 번에 캐치합니다.</p>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/shop/[...slug]/page.tsx → /shop/clothes/shirts</code>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-semibold text-yellow-700">라우트 그룹</h3>
                <p className="text-sm text-gray-600">괄호로 감싼 폴더는 URL에 포함되지 않습니다.</p>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/(marketing)/about/page.tsx → /about</code>
              </div>
            </div>
          </section>

          {/* 컴포넌트 유형 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">컴포넌트 유형</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">서버 컴포넌트 (기본값)</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 서버에서 렌더링</li>
                  <li>• 데이터베이스 직접 접근 가능</li>
                  <li>• 번들 크기 감소</li>
                  <li>• SEO 친화적</li>
                </ul>
                <div className="mt-2 bg-blue-100 p-2 rounded text-xs font-mono">
                  // 기본적으로 서버 컴포넌트
                  <br />
                  export default function Page() {'{'}
                  <br />
                  &nbsp;&nbsp;return &lt;div&gt;서버 컴포넌트&lt;/div&gt;
                  <br />
                  {'}'}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">클라이언트 컴포넌트</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 브라우저에서 실행</li>
                  <li>• 상태 관리 가능</li>
                  <li>• 이벤트 핸들러 사용</li>
                  <li>• React Hook 사용</li>
                </ul>
                <div className="mt-2 bg-green-100 p-2 rounded text-xs font-mono">
                  'use client';
                  <br />
                  <br />
                  export default function Page() {'{'}
                  <br />
                  &nbsp;&nbsp;return &lt;div&gt;클라이언트 컴포넌트&lt;/div&gt;
                  <br />
                  {'}'}
                </div>
              </div>
            </div>
          </section>

          {/* 프로젝트 구조 예시 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">프로젝트 구조 예시</h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`app/
├── layout.tsx          # 루트 레이아웃
├── page.tsx           # 홈페이지 (/)
├── loading.tsx        # 전역 로딩 UI
├── error.tsx          # 전역 에러 UI
├── not-found.tsx      # 404 페이지
├── globals.css        # 전역 스타일
│
├── (auth)/            # 라우트 그룹 (URL에 포함 안됨)
│   ├── login/
│   │   └── page.tsx   # /login
│   └── register/
│       └── page.tsx   # /register
│
├── dashboard/
│   ├── layout.tsx     # 대시보드 레이아웃
│   ├── page.tsx       # /dashboard
│   ├── loading.tsx    # 대시보드 로딩
│   └── settings/
│       └── page.tsx   # /dashboard/settings
│
├── blog/
│   ├── page.tsx       # /blog
│   └── [slug]/
│       ├── page.tsx   # /blog/[slug]
│       └── loading.tsx
│
└── api/               # API 라우트
    ├── users/
    │   └── route.ts   # /api/users
    └── posts/
        └── [id]/
            └── route.ts # /api/posts/[id]`}</pre>
            </div>
          </section>

          {/* 유용한 팁 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">유용한 팁</h2>
            <div className="grid md:grid-cols-2 gap-4">
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">💡 성능 최적화</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 서버 컴포넌트를 기본으로 사용</li>
                  <li>• 필요한 경우에만 'use client' 사용</li>
                  <li>• loading.tsx로 사용자 경험 개선</li>
                  <li>• Suspense 경계 활용</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">🎯 베스트 프랙티스</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 일관된 폴더 구조 유지</li>
                  <li>• 의미있는 라우트 그룹 사용</li>
                  <li>• 적절한 에러 처리</li>
                  <li>• TypeScript 활용</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">🔧 개발 도구</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Next.js DevTools 사용</li>
                  <li>• React Developer Tools</li>
                  <li>• 브라우저 Network 탭 활용</li>
                  <li>• Lighthouse 성능 측정</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">📚 추가 학습</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Next.js 공식 문서</li>
                  <li>• React Server Components</li>
                  <li>• App Router 마이그레이션 가이드</li>
                  <li>• 성능 최적화 기법</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/api-docs" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            API 문서 보기 →
          </Link>
        </div>
      </div>
    </div>
  );
} 