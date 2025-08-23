'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}


export default function DefaultLayout() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setMessage('로그아웃되었습니다.');
    window.location.reload();
  };

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

  if(currentUser) {
    return (
      <div>
      <header className="flex gap-[10px] flex-row items-center justify-between">
        
        <nav className="flex gap-[10px] flex-row items-center">
          <p>삼일공업고등학교 로고</p>
        </nav>
        <div>
          <p>사물인터넷과 웹사이트 프로젝트</p>
        </div>
        <nav className="flex gap-[10px] flex-row items-center">
          <Link href="/">Home</Link>
          <Link href="/posts">Posts</Link>
          <p>About</p>
          <span className="font-medium">이름:</span> {currentUser.name} 로그인 중 입니다.
          <button onClick={handleLogout}>로그아웃</button>
        </nav>
        
      </header>
  
      </div>
  );
  }

  return (
        <div>
        <header className="flex gap-[10px] flex-row items-center justify-between">
          
          <nav className="flex gap-[10px] flex-row items-center">
            <p>삼일공업고등학교 로고</p>
          </nav>
          <div>
            <p>사물인터넷과 웹사이트 프로젝트</p>
          </div>
          <nav className="flex gap-[10px] flex-row items-center">
            <Link href="/">Home</Link>
            <Link href="/posts">Posts</Link>
            <p>About</p>
            <Link href="/api/auth/getPage">Login</Link>
            <Link href="/api/auth/getPage">Signup</Link>
          </nav>
          
        </header>
    
        </div>
    );
}