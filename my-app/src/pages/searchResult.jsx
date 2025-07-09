// src/pages/SearchResult.jsx

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlayerDetail from "../components/PlayerDetail";

// 전체 페이지 스켈레톤 컴포넌트 (neutral 계열 색상 적용)
const PlayerDetailSkeleton = () => (
  <div className="w-full max-w-5xl mx-auto flex flex-col gap-2">
    {/* 상단 - 정보+recentwinrate 왼쪽, goaltypetable 오른쪽 */}
    <div className="flex flex-row gap-4">
      {/* 왼쪽 박스 */}
      <div className="bg-neutral-900 rounded-xl shadow-lg py-[2px] px-4 flex flex-row items-center gap-6 w-[700px] animate-pulse">
        <div className="flex flex-col gap-4 justify-center flex-1">
          <div className="h-6 w-32 bg-neutral-700 rounded mb-2" />
          <div className="h-6 w-20 bg-neutral-700 rounded mb-2" />
          <div className="h-14 w-full bg-neutral-700 rounded" />
        </div>
        <div className="w-40 h-40 bg-neutral-800 rounded-xl" />
      </div>
      {/* 오른쪽 박스 */}
      <div className="bg-neutral-900 rounded-xl shadow-lg py-[2px] px-4 flex items-center justify-center w-1/2 animate-pulse">
        <div className="w-full max-w-lg">
          <div className="h-6 w-48 bg-neutral-700 rounded mb-4 mx-auto" />
          <div className="w-full bg-neutral-800 rounded-xl overflow-hidden">
            <div className="flex flex-row">
              <div className="h-8 w-1/3 bg-neutral-700" />
              <div className="h-8 w-1/3 bg-neutral-700" />
              <div className="h-8 w-1/3 bg-neutral-700" />
            </div>
            {[...Array(5)].map((_, i) => (
              <div className="flex flex-row" key={i}>
                <div className="h-8 w-1/3 bg-neutral-800" />
                <div className="h-8 w-1/3 bg-neutral-800" />
                <div className="h-8 w-1/3 bg-neutral-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    {/* 하단 스쿼드 시각화, 득점유형표 스켈레톤 등도 추가 가능 */}
    <div className="flex flex-row gap-4 mt-6">
      <div className="bg-neutral-900 w-1/2 rounded-xl shadow-lg p-4 flex items-center justify-center animate-pulse">
        <div className="w-[300px] h-[480px] bg-neutral-800 rounded-2xl" />
      </div>
      <div className="bg-neutral-900 w-1/2 rounded-xl shadow-lg p-4 flex items-center justify-center animate-pulse">
        <div className="w-full h-40 bg-neutral-800 rounded-xl" />
      </div>
    </div>
    {/* 최근 경기 기록 스켈레톤 */}
    <div className="w-full max-w-4xl flex flex-col gap-4 bg-neutral-800 rounded-xl p-6 mt-6 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-full rounded-lg bg-neutral-700 p-4">
          <div className="h-6 w-1/3 bg-neutral-600 rounded mb-2" />
          <div className="h-4 w-2/3 bg-neutral-600 rounded" />
        </div>
      ))}
    </div>
  </div>
);

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const nickname = searchParams.get("nickname") || "";
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!nickname) return;
    setUserInfo(null);
    setError("");
    fetch(`/api/search?nickname=${encodeURIComponent(nickname)}`)
      .then((res) => {
        if (!res.ok) throw new Error("유저 정보를 찾을 수 없습니다.");
        return res.json();
      })
      .then((data) => setUserInfo(data))
      .catch((err) => setError(err.message));
  }, [nickname]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 움직이는 비디오 배경 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1] pointer-events-none"
      >
        <source src="/122966-726547935_small.mp4" type="video/mp4" />
      </video>
      {/* 오버레이(가독성 보강, 선택) */}
      <div
        className="fixed top-0 left-0 w-full h-full"
        style={{
          background: "rgba(24,24,28,0.7)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Header />
      <div className="flex flex-col items-center mt-10 text-lg text-white mb-4 relative z-10">
        {error && (
          <div className="text-red-500 flex flex-col items-center gap-4">
            {error}
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => window.location.href = '/'}
            >
              홈으로 돌아가기
            </button>
          </div>
        )}
        {!error && !userInfo && (
          <div className="text-white mb-10 w-full max-w-6xl mx-auto">
            <PlayerDetailSkeleton />
          </div>
        )}
        {userInfo && (
          <div className="text-white mb-10 w-full max-w-6xl mx-auto">
            <PlayerDetail ouid={userInfo.ouid} userInfo={userInfo} />
          </div>
        )}
      </div>
      <Footer className="mt-auto z-10" />
    </div>
  );
};

export default SearchResult;
