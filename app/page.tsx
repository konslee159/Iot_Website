'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  message: string;
  error?: string;
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(true); // true: 로그인, false: 회원가입
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [userList, setUserList] = useState<User[]>([]);
  const [showUserList, setShowUserList] = useState(false);
  const [userListLoading, setUserListLoading] = useState(false);
  const [userListError, setUserListError] = useState('');

  // 페이지 로드 시 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
      } catch (error) {
        console.error('사용자 정보 파싱 에러:', error);
      }
    }
  }, []);

  // 회원가입 처리
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      setMessage('모든 필드를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result: AuthResponse = await response.json();
      
      if (result.success && result.data) {
        // 로그인 성공 시 토큰과 사용자 정보 저장
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        setCurrentUser(result.data.user);
        setMessage('회원가입이 완료되었습니다!');
        setFormData({ name: '', email: '', password: '' });
      } else {
        setMessage(result.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      setMessage('네트워크 오류가 발생했습니다.');
      console.error('회원가입 에러:', error);
    } finally {
      setLoading(false);
    }
  };

  // 로그인 처리
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setMessage('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const result: AuthResponse = await response.json();
      
      if (result.success && result.data) {
        // 로그인 성공 시 토큰과 사용자 정보 저장
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        setCurrentUser(result.data.user);
        setMessage('로그인되었습니다!');
        setFormData({ name: '', email: '', password: '' });
      } else {
        setMessage(result.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      setMessage('네트워크 오류가 발생했습니다.');
      console.error('로그인 에러:', error);
    } finally {
      setLoading(false);
    }
  };

  // 유저 목록 조회 함수
  const fetchUserList = async () => {
    setUserListLoading(true);
    setUserListError('');
    try {
      const res = await fetch('/api/users');
      const result = await res.json();
      if (result.success) {
        setUserList(result.data);
      } else {
        setUserListError(result.message || '유저 목록을 불러오지 못했습니다.');
      }
    } catch (e) {
      setUserListError('네트워크 오류가 발생했습니다.');
    } finally {
      setUserListLoading(false);
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setMessage('로그아웃되었습니다.');
  };

  // 로그인 상태인 경우
  if (currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            환영합니다! 👋
          </h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">내 정보</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">이름:</span> {currentUser.name}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">이메일:</span> {currentUser.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">가입일:</span> {new Date(currentUser.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              로그아웃
            </button>
          </div>

          
          {/*
          유저 목록 보기 버튼 및 리스트
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <button
              onClick={() => {
                setShowUserList((prev) => !prev);
                if (!showUserList) fetchUserList();
              }}
              className="mb-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              {showUserList ? '유저 목록 숨기기' : '유저 목록 보기'}
            </button>
            {showUserList && (
              <div>
                {userListLoading ? (
                  <div className="text-center text-gray-500 py-4">로딩 중...</div>
                ) : userListError ? (
                  <div className="text-center text-red-500 py-4">{userListError}</div>
                ) : userList.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">등록된 유저가 없습니다.</div>
                ) : (
                  <div>
                    <div className="mb-2 text-sm text-gray-700">총 {userList.length}명</div>
                    <ul className="divide-y divide-gray-200">
                      {userList.map((user) => (
                        <li key={user._id} className="py-3">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <span className="font-semibold text-gray-800">{user.name}</span>
                              <span className="ml-2 text-gray-500">({user.email})</span>
                            </div>
                            <div className="text-gray-400 text-sm mt-1 md:mt-0">
                              가입일: {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          API 정보
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">API 엔드포인트 정보</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">POST</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/auth/signup</code> - 회원가입
              </div>
              <div>
                <span className="font-medium">POST</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/auth/login</code> - 로그인
              </div>
              <div>
                <span className="font-medium">GET</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/users</code> - 유저 목록 조회
              </div>
              <div>
                <span className="font-medium">GET</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/posts</code> - 게시글 목록 조회
              </div>
              <div>
                <span className="font-medium">POST</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/posts</code> - 게시글 작성
              </div>
              <div>
                <span className="font-medium">GET</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/posts/[id]</code> - 게시글 상세 조회
              </div>
              <div>
                <span className="font-medium">PUT</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/posts/[id]</code> - 게시글 수정
              </div>
              <div>
                <span className="font-medium">DELETE</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/posts/[id]</code> - 게시글 삭제
              </div>
            </div>
          </div>
          */}
          {/* 게시판 바로가기 */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">게시판</h2>
            <p className="mb-4 text-gray-600">
              자유롭게 글을 작성하고 공유할 수 있는 게시판입니다.
            </p>
            <Link
              href="/posts"
              className="block w-full bg-blue-500 text-center text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              게시판으로 이동
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 로그인/회원가입 폼
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          환영합니다! 👋
        </h1>
        
          {/* 
          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            로그아웃
          </button>
        </div>
        */}
        
        {/*
        유저 목록 보기 버튼 및 리스트
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <button
            onClick={() => {
              setShowUserList((prev) => !prev);
              if (!showUserList) fetchUserList();
            }}
            className="mb-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            {showUserList ? '유저 목록 숨기기' : '유저 목록 보기'}
          </button>
          {showUserList && (
            <div>
              {userListLoading ? (
                <div className="text-center text-gray-500 py-4">로딩 중...</div>
              ) : userListError ? (
                <div className="text-center text-red-500 py-4">{userListError}</div>
              ) : userList.length === 0 ? (
                <div className="text-center text-gray-500 py-4">등록된 유저가 없습니다.</div>
              ) : (
                <div>
                  <div className="mb-2 text-sm text-gray-700">총 {userList.length}명</div>
                  <ul className="divide-y divide-gray-200">
                    {userList.map((user) => (
                      <li key={user._id} className="py-3">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <span className="font-semibold text-gray-800">{user.name}</span>
                            <span className="ml-2 text-gray-500">({user.email})</span>
                          </div>
                          <div className="text-gray-400 text-sm mt-1 md:mt-0">
                            가입일: {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        API 정보
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">API 엔드포인트 정보</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">POST</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/auth/signup</code> - 회원가입
            </div>
            <div>
              <span className="font-medium">POST</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/auth/login</code> - 로그인
            </div>
            <div>
              <span className="font-medium">GET</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/users</code> - 유저 목록 조회
            </div>
            <div>
              <span className="font-medium">GET</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/posts</code> - 게시글 목록 조회
            </div>
            <div>
              <span className="font-medium">POST</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/posts</code> - 게시글 작성
            </div>
            <div>
              <span className="font-medium">GET</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/posts/[id]</code> - 게시글 상세 조회
            </div>
            <div>
              <span className="font-medium">PUT</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/posts/[id]</code> - 게시글 수정
            </div>
            <div>
              <span className="font-medium">DELETE</span> <code className="bg-gray-100 px-2 py-1 rounded">/api/posts/[id]</code> - 게시글 삭제
            </div>
          </div>
        </div>
        */}
        {/* 게시판 바로가기 */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">게시판</h2>
          <p className="mb-4 text-gray-600">
            자유롭게 글을 작성하고 공유할 수 있는 게시판입니다.
          </p>
          <Link
            href="/posts"
            className="block w-full bg-blue-500 text-center text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            게시판으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}