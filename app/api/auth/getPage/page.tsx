'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


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

export default function GetPage() {
  const router = useRouter();
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
        // 이미 로그인된 상태라면 메인 페이지로 이동
        router.push('/');
      } catch (error) {
        console.error('사용자 정보 파싱 에러:', error);
        // 잘못된 데이터 정리
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, [router]);

  // 회원가입 처리
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      setMessage('모든 필드를 입력해주세요.');
      return;
    }

    if (formData.password.length < 6) {
      setMessage('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: AuthResponse = await response.json();
      
      if (result.success && result.data) {
        // 회원가입 성공 시 토큰과 사용자 정보 저장
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        setCurrentUser(result.data.user);
        setMessage('회원가입이 완료되었습니다! 잠시 후 메인 페이지로 이동합니다.');
        setFormData({ name: '', email: '', password: '' });
        
        // 2초 후 메인 페이지로 이동하고 새로고침
        setTimeout(() => {
          router.push('/');
          // 페이지 이동 후 새로고침
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }, 2000);
      } else {
        setMessage(result.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 에러:', error);
      if (error instanceof Error && error.message.includes('HTTP error')) {
        setMessage('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        setMessage('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
      }
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
    setMessage('');
    
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
  

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: AuthResponse = await response.json();
      console.log(result)
      
      if (result.success && result.data) {
        // 로그인 성공 시 토큰과 사용자 정보 저장
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        setCurrentUser(result.data.user);
        setMessage('로그인되었습니다! 잠시 후 메인 페이지로 이동합니다.');
        setFormData({ name: '', email: '', password: '' });;
        
        // 2초 후 메인 페이지로 이동하고 새로고침
        setTimeout(() => {
          router.push('/');
          // 페이지 이동 후 새로고침
          setTimeout(() => {
            window.location.reload();
          }, 100);
        },2000)

      } else {
        setMessage(result.message || '로그인에 실패했습니다.');
      }

      
    } catch (error) {
      console.error('로그인 에러:', error);
      if (error instanceof Error && error.message.includes('HTTP error')) {
        setMessage('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        setMessage('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 유저 목록 조회 함수
  const fetchUserList = async () => {
    setUserListLoading(true);
    setUserListError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUserListError('로그인이 필요합니다.');
        return;
      }

      const res = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      if (result.success) {
        setUserList(result.data);
      } else {
        setUserListError(result.message || '유저 목록을 불러오지 못했습니다.');
      }
    } catch (e) {
      console.error('유저 목록 조회 에러:', e);
      if (e instanceof Error && e.message.includes('HTTP error')) {
        setUserListError('서버 오류가 발생했습니다.');
      } else {
        setUserListError('네트워크 오류가 발생했습니다.');
      }
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
    setUserList([]);
    setShowUserList(false);
  };

  // 로그인/회원가입 폼
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          간단한 로그인 시스템
        </h1>
        
        {/* 메시지 표시 */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('성공') || message.includes('완료') || message.includes('되었습니다')
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* 탭 전환 */}
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-center font-medium transition-colors ${
                isLogin 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 border-b-2 border-gray-200'
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-center font-medium transition-colors ${
                !isLogin 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 border-b-2 border-gray-200'
              }`}
            >
              회원가입
            </button>
          </div>

          {/* 폼 */}
          <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="이름을 입력하세요"
                  required
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="이메일을 입력하세요"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="비밀번호를 입력하세요 (최소 6자)"
                minLength={6}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '처리 중...' : (isLogin ? '로그인' : '회원가입')}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            {isLogin ? (
              <p>
                계정이 없으신가요?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:underline"
                >
                  회원가입하기
                </button>
              </p>
            ) : (
              <p>
                이미 계정이 있으신가요?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:underline"
                >
                  로그인하기
                </button>
              </p>
            )}
          </div>
        </div>       
      </div>
    </div>
  );
}
