'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '@/app/components/PostForm';

export default function WritePostPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      router.push('/');
      return;
    }
    
    setIsLoggedIn(true);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-center items-center py-10">
            <div className="text-gray-500">로딩 중...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // 리다이렉트 중이므로 아무것도 렌더링하지 않음
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <PostForm />
        </div>
      </div>
    </div>
  );
} 