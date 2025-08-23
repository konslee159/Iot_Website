'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// 게시글 타입 정의
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

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface PostListProps {
  initialPosts?: Post[];
  initialPagination?: Pagination;
}

export default function PostList({ initialPosts, initialPagination }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [pagination, setPagination] = useState<Pagination>(
    initialPagination || {
      total: 0,
      page: 1,
      limit: 10,
      pages: 0
    }
  );
  const [loading, setLoading] = useState(!initialPosts);
  const [error, setError] = useState('');

  // 게시글 목록 가져오기
  const fetchPosts = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/posts?page=${page}&limit=${pagination.limit}`);
      const result = await response.json();
      
      if (result.success) {
        setPosts(result.data);
        setPagination(result.pagination);
      } else {
        setError(result.message || '게시글을 불러오지 못했습니다.');
      }
    } catch (e) {
      setError('네트워크 오류가 발생했습니다.');
      console.error('게시글 목록 조회 에러:', e);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터가 없는 경우 데이터 로드
  useEffect(() => {
    if (!initialPosts) {
      fetchPosts();
    }
  }, [initialPosts]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    fetchPosts(page);
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

  // 페이지네이션 렌더링
  const renderPagination = () => {
    const pages = [];
    const { page, pages: totalPages } = pagination;
    
    // 시작 페이지와 끝 페이지 계산 (최대 5개 페이지 표시)
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            page === i
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    
    return (
      <div className="flex justify-center mt-6">
        {page > 1 && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-3 py-1 mx-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            이전
          </button>
        )}
        {pages}
        {page < totalPages && (
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-3 py-1 mx-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            다음
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-gray-500">게시글을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {posts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          작성된 게시글이 없습니다.
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-900">제목</th>
                  <th className="px-6 py-4 font-medium text-gray-900">작성자</th>
                  <th className="px-6 py-4 font-medium text-gray-900">작성일</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href={`/posts/${post._id}`} className="text-blue-600 hover:underline">
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{post.author.name}</td>
                    <td className="px-6 py-4">{formatDate(post.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pagination.pages > 1 && renderPagination()}
        </>
      )}
    </div>
  );
} 