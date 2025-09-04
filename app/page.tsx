'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import * as React from "react"
import Image from 'next/image';

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

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
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

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


  // 로그인 상태인 경우
  if (currentUser) {
    return (
      
      <div className="min-h-screen bg-gray-50">

      <div className="bg-gray-100 border-b">
                <div className="max-w-4xl mx-auto px-4 py-6">
                  <Carousel setApi={setApi} className="w-full max-w-none">
                    <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="h-100">
                          <Card className="h-full">
                            <CardContent className="h-full flex items-center justify-center p-6">
                              <span className="text-4xl font-semibold">{index + 1}</span>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </div>
              
              

              {/*<div className="max-w-4xl mx-auto px-4">
           <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            환영합니다! 👋
          </h1> */}
          
          {/* <div className="bg-white p-6 rounded-lg shadow-md mb-8">
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
          </div> */}
          

          
          {/* /*
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
          */
          /* 게시판 바로가기 
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
        </div> */}
      </div>
    );
  }

  // 로그인/회원가입 폼
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">

<Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="h-48">
              <Card className="h-full">
                <CardContent className="h-full flex items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
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