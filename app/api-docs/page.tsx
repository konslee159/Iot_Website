import Link from 'next/link';

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6 flex justify-between items-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← 홈으로 돌아가기
          </Link>
          <Link 
            href="/docs" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            Next.js 가이드 보기 →
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          API 문서
        </h1>

        <div className="grid gap-8">
          {/* API 개요 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">API 개요</h2>
            <p className="text-gray-600 mb-4">
              이 API는 간단한 사용자 관리 시스템을 위한 RESTful API입니다. 
              Next.js 15의 App Router를 사용하여 구현되었으며, 사용자 데이터의 생성과 조회를 지원합니다.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800">Base URL</h3>
                <code className="text-sm text-blue-600">/api</code>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800">Content-Type</h3>
                <code className="text-sm text-green-600">application/json</code>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800">Response Format</h3>
                <code className="text-sm text-purple-600">JSON</code>
              </div>
            </div>
          </section>

          {/* 사용자 API */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Users API</h2>
            
            {/* GET /api/users */}
            <div className="mb-8 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                  GET
                </span>
                <code className="text-lg font-mono">/api/users</code>
              </div>
              <p className="text-gray-600 mb-4">모든 사용자 목록을 조회합니다.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">요청 예시</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                    <pre>{`curl -X GET /api/users \\
  -H "Content-Type: application/json"`}</pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">응답 예시 (200 OK)</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                    <pre>{`{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "김철수",
      "email": "kim@example.com",
      "age": 25
    },
    {
      "id": 2,
      "name": "이영희",
      "email": "lee@example.com",
      "age": 30
    }
  ],
  "message": "사용자 목록을 성공적으로 조회했습니다."
}`}</pre>
                  </div>
                </div>
              </div>
            </div>

            {/* POST /api/users */}
            <div className="mb-8 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                  POST
                </span>
                <code className="text-lg font-mono">/api/users</code>
              </div>
              <p className="text-gray-600 mb-4">새로운 사용자를 추가합니다.</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">요청 파라미터</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800 border-b">필드</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800 border-b">타입</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800 border-b">필수</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800 border-b">설명</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 text-sm border-b"><code>name</code></td>
                        <td className="px-4 py-2 text-sm border-b">string</td>
                        <td className="px-4 py-2 text-sm border-b">✅</td>
                        <td className="px-4 py-2 text-sm border-b">사용자 이름</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm border-b"><code>email</code></td>
                        <td className="px-4 py-2 text-sm border-b">string</td>
                        <td className="px-4 py-2 text-sm border-b">✅</td>
                        <td className="px-4 py-2 text-sm border-b">이메일 주소 (고유값)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm"><code>age</code></td>
                        <td className="px-4 py-2 text-sm">number</td>
                        <td className="px-4 py-2 text-sm">✅</td>
                        <td className="px-4 py-2 text-sm">나이 (1-120)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">요청 예시</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                    <pre>{`curl -X POST /api/users \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "박민수",
    "email": "park@example.com",
    "age": 28
  }'`}</pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">응답 예시 (201 Created)</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                    <pre>{`{
  "success": true,
  "data": {
    "id": 4,
    "name": "박민수",
    "email": "park@example.com",
    "age": 28
  },
  "message": "새 사용자가 성공적으로 추가되었습니다."
}`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 응답 형식 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">응답 형식</h2>
            <p className="text-gray-600 mb-4">
              모든 API 응답은 일관된 JSON 형식을 따릅니다.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-700 mb-2">성공 응답</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  <pre>{`{
  "success": true,
  "data": {}, // 또는 []
  "message": "성공 메시지"
}`}</pre>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-red-700 mb-2">에러 응답</h3>
                <div className="bg-gray-900 text-red-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  <pre>{`{
  "success": false,
  "message": "에러 메시지",
  "error": "상세 에러 정보" // 선택적
}`}</pre>
                </div>
              </div>
            </div>
          </section>

          {/* HTTP 상태 코드 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">HTTP 상태 코드</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 border-b">코드</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 border-b">상태</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 border-b">설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50">
                    <td className="px-4 py-3 text-sm font-mono border-b">200</td>
                    <td className="px-4 py-3 text-sm font-semibold text-green-700 border-b">OK</td>
                    <td className="px-4 py-3 text-sm border-b">요청이 성공적으로 처리됨</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="px-4 py-3 text-sm font-mono border-b">201</td>
                    <td className="px-4 py-3 text-sm font-semibold text-blue-700 border-b">Created</td>
                    <td className="px-4 py-3 text-sm border-b">새 리소스가 성공적으로 생성됨</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="px-4 py-3 text-sm font-mono border-b">400</td>
                    <td className="px-4 py-3 text-sm font-semibold text-yellow-700 border-b">Bad Request</td>
                    <td className="px-4 py-3 text-sm border-b">잘못된 요청 (필수 필드 누락, 유효성 검사 실패)</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="px-4 py-3 text-sm font-mono border-b">409</td>
                    <td className="px-4 py-3 text-sm font-semibold text-orange-700 border-b">Conflict</td>
                    <td className="px-4 py-3 text-sm border-b">리소스 충돌 (이메일 중복 등)</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="px-4 py-3 text-sm font-mono">500</td>
                    <td className="px-4 py-3 text-sm font-semibold text-red-700">Internal Server Error</td>
                    <td className="px-4 py-3 text-sm">서버 내부 오류</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 에러 예시 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">에러 응답 예시</h2>
            <div className="grid gap-6">
              
              <div>
                <h3 className="font-semibold text-red-700 mb-2">400 Bad Request - 필수 필드 누락</h3>
                <div className="bg-gray-900 text-red-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  <pre>{`{
  "success": false,
  "message": "이름, 이메일, 나이는 필수 입력 항목입니다."
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-orange-700 mb-2">409 Conflict - 이메일 중복</h3>
                <div className="bg-gray-900 text-orange-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  <pre>{`{
  "success": false,
  "message": "이미 존재하는 이메일입니다."
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-red-700 mb-2">500 Internal Server Error</h3>
                <div className="bg-gray-900 text-red-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  <pre>{`{
  "success": false,
  "message": "사용자 추가 중 오류가 발생했습니다.",
  "error": "상세한 에러 메시지"
}`}</pre>
                </div>
              </div>
            </div>
          </section>

          {/* Next.js API Routes 특징 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Next.js API Routes 특징</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">🚀 서버리스 함수</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 자동 스케일링</li>
                  <li>• 콜드 스타트 최적화</li>
                  <li>• 비용 효율적</li>
                  <li>• 배포 간소화</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">🔧 개발 편의성</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 파일 기반 라우팅</li>
                  <li>• TypeScript 지원</li>
                  <li>• 미들웨어 지원</li>
                  <li>• 핫 리로드</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">🛡️ 보안</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• CORS 자동 처리</li>
                  <li>• 환경 변수 보호</li>
                  <li>• 요청 검증</li>
                  <li>• Rate limiting 가능</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">⚡ 성능</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Edge Runtime 지원</li>
                  <li>• 캐싱 최적화</li>
                  <li>• 스트리밍 응답</li>
                  <li>• 압축 자동화</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 실제 테스트 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">API 테스트하기</h2>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-4">
              <p className="text-blue-800">
                <strong>팁:</strong> 브라우저 개발자 도구의 Network 탭이나 Postman, curl 등을 사용하여 API를 테스트할 수 있습니다.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">JavaScript (Fetch API)</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  <pre>{`// 사용자 목록 조회
const response = await fetch('/api/users');
const data = await response.json();

// 새 사용자 추가
const newUser = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: '홍길동',
    email: 'hong@example.com',
    age: 25
  })
});`}</pre>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">curl 명령어</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  <pre>{`# 사용자 목록 조회
curl -X GET http://localhost:3000/api/users

# 새 사용자 추가
curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "홍길동",
    "email": "hong@example.com",
    "age": 25
  }'`}</pre>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-4"
          >
            ← 메인으로 돌아가기
          </Link>
          <Link 
            href="/docs" 
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Next.js 가이드 보기
          </Link>
        </div>
      </div>
    </div>
  );
} 