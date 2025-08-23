// 게시글 목록 조회 및 생성 API
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Post from '@/lib/models/Post';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

// JWT 시크릿 키
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 토큰에서 사용자 정보 추출
const getUserFromToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  } catch (error) {
    return null;
  }
};

// 게시글 목록 조회
export async function GET(request: NextRequest) {
  try {
    // MongoDB 연결
    await connectDB();

    // 쿼리 파라미터 가져오기
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // 게시글 목록 조회 (작성자 정보 포함)
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // 최신순 정렬
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email') // 작성자 정보 가져오기
      .lean(); // 성능 최적화

    // 전체 게시글 수 조회
    const total = await Post.countDocuments();

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('게시글 목록 조회 에러:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: '게시글 목록을 불러오는 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// 게시글 생성
export async function POST(request: NextRequest) {
  try {
    // MongoDB 연결
    await connectDB();

    // 인증 확인
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 토큰 추출 및 검증
    const token = authHeader.split(' ')[1];
    const decoded = getUserFromToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    // 사용자 확인
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 요청 body에서 데이터 추출
    const { title, content } = await request.json();

    // 입력값 검증
    if (!title || !content) {
      return NextResponse.json(
        { 
          success: false, 
          message: '제목과 내용은 필수입니다.' 
        },
        { status: 400 }
      );
    }

    // 새 게시글 생성
    const newPost = await Post.create({
      title,
      content,
      author: user._id,
    });

    // 작성자 정보 포함하여 반환
    const populatedPost = await Post.findById(newPost._id)
      .populate('author', 'name email')
      .lean();

    return NextResponse.json({
      success: true,
      message: '게시글이 작성되었습니다.',
      data: populatedPost
    }, { status: 201 });

  } catch (error) {
    console.error('게시글 작성 에러:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: '게시글 작성 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 