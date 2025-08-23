"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <button onClick={() => router.push("/")}>
      /target 으로 이동
    </button>
  );
}


// router.refresh();  // 데이터 패칭 다시 하고, 컴포넌트 리렌더링, reload 임.