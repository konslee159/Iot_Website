'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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

  if (currentUser) {
    return (
      <div className="flex justify-center">
        <header className="grid grid-cols-[1fr_auto_1fr] items-center w-full px-4 py-3 bg-gray-100 border-2 border-solid gap-4 md:gap-6">
          <div className="flex flex-row items-center gap-4">
            <Image
              src="/logo.png"
              alt="logo"
              width={80}
              height={80}
              className="w-12 h-12 md:w-16 md:h-16"
            />
          </div>
          <div className="text-center">
            <p className="text-sm md:text-base">사물인터넷과 웹사이트 프로젝트</p>
          </div>
          <nav className="flex flex-row items-center gap-4 justify-self-end">
            <Link className="px-2 py-1 text-sm md:text-base" href="/">
              Home
            </Link>
            <Link className="px-2 py-1 text-sm md:text-base" href="/posts">
              Posts
            </Link>
            <Link className="px-2 py-1 text-sm md:text-base" href="/api/about">
              About
            </Link>
            <span className="font-medium text-sm md:text-base">
              이름: {currentUser.name} 로그인 중 입니다.
            </span>
            <Button
              className="px-2 py-1 text-sm md:text-base"
              variant="destructive"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </nav>
        </header>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center w-full px-4 py-3 bg-gray-100 border-2 border-solid gap-4 md:gap-6">
        <div className="flex flex-row items-center gap-4">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="w-10 h-10 md:w-12 md:h-12"
          />
        </div>
        <div className="text-center">
          <p className="text-sm md:text-base">사물인터넷과 웹사이트 프로젝트</p>
        </div>
        <nav className="flex flex-row items-center gap-4 justify-self-end">
          <Link className="px-2 py-1 text-sm md:text-base" href="/">
            Home
          </Link>
          <Link className="px-2 py-1 text-sm md:text-base" href="/posts">
            Posts
          </Link>
          <p className="px-2 py-1 text-sm md:text-base">About</p>
          <Button asChild>
            <Link className="px-2 py-1 text-sm md:text-base" href="/api/auth/getPage">
              Login
            </Link>
          </Button>
          <Button asChild>
            <Link className="px-2 py-1 text-sm md:text-base" href="/api/auth/getPage">
              Signup
            </Link>
          </Button>
        </nav>
      </header>
    </div>
  );
}