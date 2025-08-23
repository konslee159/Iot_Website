'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PostFormProps {
  postId?: string;
  initialTitle?: string;
  initialContent?: string;
  isEdit?: boolean;
}

export default function PostForm({ 
  postId, 
  initialTitle = '', 
  initialContent = '', 
  isEdit = false 
}: PostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 입력값 검증
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      // 로컬 스토리지에서 토큰 가져오기
      const token = localStorage.getItem('token');
      if (!token) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      // API 요청 설정
      const url = isEdit ? `/api/posts/${postId}` : '/api/posts';
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage(isEdit ? '게시글이 수정되었습니다.' : '게시글이 작성되었습니다.');
        
        // 성공 시 리다이렉트
        setTimeout(() => {
          if (isEdit) {
            router.push(`/posts/${postId}`);
          } else {
            router.push('/posts');
          }
          router.refresh();
        }, 1000);
      } else {
        setError(result.message || '오류가 발생했습니다.');
      }
    } catch (e) {
      setError('네트워크 오류가 발생했습니다.');
      console.error('게시글 저장 에러:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? '게시글 수정' : '새 게시글 작성'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {/* 성공 메시지 */}
        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {message}
          </div>
        )}
        
        {/* 제목 입력 */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="제목을 입력하세요"
            disabled={loading}
          />
        </div>
        
        {/* 내용 입력 */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="내용을 입력하세요"
            disabled={loading}
          />
        </div>
        
        {/* 버튼 영역 */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={loading}
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? '처리 중...' : isEdit ? '수정하기' : '작성하기'}
          </button>
        </div>
      </form>
    </div>
  );
} 