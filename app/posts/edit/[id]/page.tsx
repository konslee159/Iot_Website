'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PostForm from '@/app/components/PostForm';

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

export default function EditPostPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState<{ userId: string } | null>(null);
  const router = useRouter();

  // 게시글 정보 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 로그인 확인
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (!token || !userStr) {
          alert('로그인이 필요합니다.');
          router.push('/');
          return;
        }

        // 현재 사용자 정보 설정
        try {
          const user = JSON.parse(userStr);
          setCurrentUser({ userId: user._id });
        } catch (error) {
          console.error('사용자 정보 파싱 에러:', error);
          alert('사용자 정보를 확인할 수 없습니다.');
          router.push('/');
          return;
        }

        // 게시글 정보 가져오기
        const response = await fetch(`/api/posts/${id}`);
        const result = await response.json();
        
        if (result.success) {
          const fetchedPost = result.data;
          
          // 작성자 확인 (본인 게시글만 수정 가능)
          if (fetchedPost.author._id !== JSON.parse(userStr)._id) {
            alert('본인이 작성한 게시글만 수정할 수 있습니다.');
            router.push(`/posts/${id}`);
            return;
          }
          
          setPost(fetchedPost);
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
  }, [id, router]);

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

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-center items-center py-10">
            <div className="text-red-500">{error || '게시글을 찾을 수 없습니다.'}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <PostForm
            postId={post._id}
            initialTitle={post.title}
            initialContent={post.content}
            isEdit={true}
          />
        </div>
      </div>
    </div>
  );
} 