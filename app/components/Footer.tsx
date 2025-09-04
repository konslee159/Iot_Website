import * as React from "react"

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-6 text-sm text-gray-600 text-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-gray-700">© {new Date().getFullYear()} Iot Website. All rights reserved.</p>
          <div className="flex gap-4 text-gray-500">
            <p>
            경기 수원시 팔달구 수원천로392번길 44-60 (매향동, 삼일공고) 삼일공업고등학교 <br />

            TEL. (031)257-3131 FAX.(031)257-3135 <br />

            TEL 교무실: 031-257-3131 / 행정실 031-250-4705~7(09:00 - 17:00) / 당직실: 031-250-4709(야간,휴일) / FAX 031-257-3135 <br />
            Copyright ⓒ 2020 All Rights Reserved. <br />
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
