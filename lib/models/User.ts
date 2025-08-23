// User 모델 정의
import mongoose from 'mongoose';

// User 인터페이스 정의 (TypeScript 타입 지정)
export interface IUser {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

// User 스키마 정의
const UserSchema = new mongoose.Schema<IUser>({
  // 이메일 (필수, 고유값, 소문자로 저장)
  email: {
    type: String,
    required: [true, '이메일은 필수입니다'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  // 비밀번호 (필수, 최소 6자)
  password: {
    type: String,
    required: [true, '비밀번호는 필수입니다'],
    minlength: [6, '비밀번호는 최소 6자 이상이어야 합니다'],
  },
  // 이름 (필수)
  name: {
    type: String,
    required: [true, '이름은 필수입니다'],
    trim: true,
  },
  // 생성일자 (자동 생성)
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 모델이 이미 있으면 재사용, 없으면 새로 생성
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 