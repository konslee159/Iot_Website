'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Author {
  _id: string;
  name: string;
  email: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

export default function PostDetailPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState<{ userId: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  // 게시글 정보 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        const result = await response.json();
        
        if (result.success) {
          setPost(result.data);
        } else {
          setError(result.message || '게시글을 불러오지 못했습니다.');
        }
      } catch (e) {
        setError('네트워크 오류가 발생했습니다.');
        console.error('게시글 조회 에러:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // 현재 로그인한 사용자 정보 가져오기
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser({ userId: user._id });
      } catch (error) {
        console.error('사용자 정보 파싱 에러:', error);
      }
    }
  }, []);

  // 게시글 삭제 처리
  const handleDelete = async () => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('로그인이 필요합니다.');
        setIsDeleting(false);
        return;
      }

      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      
      if (result.success) {
        alert('게시글이 삭제되었습니다.');
        router.push('/posts');
        router.refresh();
      } else {
        setError(result.message || '게시글 삭제 중 오류가 발생했습니다.');
      }
    } catch (e) {
      setError('네트워크 오류가 발생했습니다.');
      console.error('게시글 삭제 에러:', e);
    } finally {
      setIsDeleting(false);
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 로딩 중
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-center items-center py-10">
            <div className="text-gray-500">게시글을 불러오는 중...</div>
          </div>
        </div>
      </div>
    );
  }

  // 에러 발생
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-center items-center py-10">
            <div className="text-red-500">{error || '게시글을 찾을 수 없습니다.'}</div>
          </div>
          <div className="flex justify-center mt-4">
            <Link
              href="/posts"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              목록으로
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 게시글 내용 표시
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h1>
            <div className="flex justify-between text-sm text-gray-500">
              <div>작성자: {post.author.name}</div>
              <div>
                작성일: {formatDate(post.createdAt)}
                {post.updatedAt !== post.createdAt && 
                  ` (수정됨: ${formatDate(post.updatedAt)})`}
              </div>
            </div>
          </div>
          
          <div className="border-t border-b border-gray-200 py-6 my-6">
            <div className="prose max-w-none">
              {post.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Link
              href="/posts"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              목록으로
            </Link>
            
            {currentUser && currentUser.userId === post.author._id && (
              <div className="flex space-x-2">
                <Link
                  href={`/posts/edit/${post._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  수정
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:bg-red-300"
                >
                  {isDeleting ? '삭제 중...' : '삭제'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
