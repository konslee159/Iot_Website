'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PostList from '../components/PostList';

export default function PostsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">게시판</h1>
          <div className="flex space-x-4">
            <Link
              href="/"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              홈으로
            </Link>
            {isLoggedIn && (
              <Link
                href="/posts/write"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                글쓰기
              </Link>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <PostList />
        </div>
        
        {!isLoggedIn && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
            게시글을 작성하려면 <Link href="/api/auth/getPage" className="text-blue-600 hover:underline">로그인</Link>이 필요합니다.
          </div>
        )}
      </div>
    </div>
  );
} 