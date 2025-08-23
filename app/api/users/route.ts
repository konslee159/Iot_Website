import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

// GET /api/users - 모든 유저 목록 조회 (비밀번호 제외)
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    // 모든 유저 조회, 비밀번호 제외
    const users = await User.find({}, '-password').lean();
    return NextResponse.json({
      success: true,
      data: users,
      message: '유저 목록을 성공적으로 조회했습니다.'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: '유저 목록 조회 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 