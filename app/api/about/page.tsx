'use client';

import { useState, useEffect } from 'react';
import * as React from "react"
import Image from 'next/image';

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)


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


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="flex justify-center">
                <Image
                  src="/image1.png"
                  alt="image1"
                  width={1820}
                  height={100}
                />
        </div>
          
      </div>
    </div>
  );
}