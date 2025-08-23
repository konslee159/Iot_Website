// 게시글 상세 조회, 수정, 삭제 API
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Post from '@/lib/models/Post';
// import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

// JWT 시크릿 키
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 토큰에서 사용자 정보 추출
const getUserFromToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  } catch {
    return null;
  }
};

// 게시글 ID 유효성 검사
const isValidObjectId = (id: string) => {
  return Types.ObjectId.isValid(id);
};

// 게시글 상세 조회
export async function GET(
  request: NextRequest
) {
  try {
    // MongoDB 연결
    await connectDB();

    const id = request.nextUrl.pathname.split('/').pop() || '';
    // const id = context.params.id;

    // ID 유효성 검사
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 게시글 ID입니다.' },
        { status: 400 }
      );
    }

    // 게시글 조회 (작성자 정보 포함)
    const post = await Post.findById(id)
      .populate('author', 'name email')
      .lean();

    // 게시글이 없는 경우
    if (!post) {
      return NextResponse.json(
        { success: false, message: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post
    });

  } catch (error) {
    console.error('게시글 상세 조회 에러:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: '게시글을 불러오는 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// 게시글 수정
export async function PUT(
  request: NextRequest
) {
  try {
    // MongoDB 연결
    await connectDB();

    const id = request.nextUrl.pathname.split('/').pop() || '';

    // ID 유효성 검사
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 게시글 ID입니다.' },
        { status: 400 }
      );
    }

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

    // 게시글 조회
    const post = await Post.findById(id);

    // 게시글이 없는 경우
    if (!post) {
      return NextResponse.json(
        { success: false, message: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 작성자 확인 (본인 게시글만 수정 가능)
    if (post.author.toString() !== decoded.userId) {
      return NextResponse.json(
        { success: false, message: '게시글을 수정할 권한이 없습니다.' },
        { status: 403 }
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

    // 게시글 업데이트
    post.title = title;
    post.content = content;
    post.updatedAt = new Date();
    await post.save();

    // 작성자 정보 포함하여 반환
    const updatedPost = await Post.findById(id)
      .populate('author', 'name email')
      .lean();

    return NextResponse.json({
      success: true,
      message: '게시글이 수정되었습니다.',
      data: updatedPost
    });

  } catch (error) {
    console.error('게시글 수정 에러:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: '게시글 수정 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// 게시글 삭제
export async function DELETE(
  request: NextRequest
) {
  try {
    // MongoDB 연결
    await connectDB();

    const id = request.nextUrl.pathname.split('/').pop() || '';

    // ID 유효성 검사
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 게시글 ID입니다.' },
        { status: 400 }
      );
    }

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

    // 게시글 조회
    const post = await Post.findById(id);

    // 게시글이 없는 경우
    if (!post) {
      return NextResponse.json(
        { success: false, message: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 작성자 확인 (본인 게시글만 삭제 가능)
    if (post.author.toString() !== decoded.userId) {
      return NextResponse.json(
        { success: false, message: '게시글을 삭제할 권한이 없습니다.' },
        { status: 403 }
      );
    }

    // 게시글 삭제
    await Post.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: '게시글이 삭제되었습니다.'
    });

  } catch (error) {
    console.error('게시글 삭제 에러:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: '게시글 삭제 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
