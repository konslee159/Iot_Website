// 로그인 API
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

// JWT 시크릿 키 (실제 프로젝트에서는 환경변수로 관리)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    // MongoDB 연결
    await connectDB();

    // 요청 body에서 데이터 추출
    const { email, password } = await request.json();
    console.log(email, password )

    // 입력값 검증
    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          message: '이메일과 비밀번호를 입력해주세요.' 
        },
        { status: 400 }
      );
    }

    // 사용자 찾기
    const user = await User.findOne({ email });
    if (!user) {

      return NextResponse.json(
        { 
          success: false, 
          message: '이메일 또는 비밀번호가 일치하지 않습니다.' 
        },
        { status: 401 }
      );
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(isPasswordValid)

      return NextResponse.json(
        { 
          success: false, 
          message: '이메일 또는 비밀번호가 일치하지 않습니다.' 
        },
        { status: 401 }
      );
    }

    // JWT 토큰 생성 (유효기간: 7일)
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 비밀번호를 제외한 사용자 정보 반환
    const userWithoutPassword = {
      _id: user._id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };

    return NextResponse.json({
      success: true,
      message: '로그인에 성공했습니다.',
      data: {
        user: userWithoutPassword,
        token,
      }
    });

  } catch (error) {
    console.error('로그인 에러:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: '로그인 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 