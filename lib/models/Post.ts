// Post 모델 정의
import mongoose from 'mongoose';
import { IUser } from './User';

// Post 인터페이스 정의 (TypeScript 타입 지정)
export interface IPost {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
}

// Post 스키마 정의
const PostSchema = new mongoose.Schema<IPost>({
  // 제목 (필수)
  title: {
    type: String,
    required: [true, '제목은 필수입니다'],
    trim: true,
    maxlength: [100, '제목은 최대 100자까지 가능합니다'],
  },
  // 내용 (필수)
  content: {
    type: String,
    required: [true, '내용은 필수입니다'],
  },
  // 작성자 (User 모델 참조)
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '작성자 정보는 필수입니다'],
  },
  // 생성일자 (자동 생성)
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // 수정일자 (자동 생성 및 업데이트)
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// 모델이 이미 있으면 재사용, 없으면 새로 생성
export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema); 