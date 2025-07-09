// src/pages/Fhome.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import 공지1 from "../assets/공지1.png";
import 공지2 from "../assets/공지2.png";
import 공지3 from "../assets/공지3.png";
import 공지4 from "../assets/공지4.png";
import 배너1 from "../assets/배너1.png";
import 배너2 from "../assets/배너2.png";
import 배너3 from "../assets/배너3.png";
import 배너4 from "../assets/배너4.png";
import 배너5 from "../assets/배너5.png";
import 배너6 from "../assets/배너6.png";
import 배너7 from "../assets/배너7.png";
import 배너8 from "../assets/배너8.png";

const Fhome = () => {
  const [nickname, setNickname] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nickname.trim()) {
      navigate(`/search?nickname=${encodeURIComponent(nickname)}`);
    }
  };

  useEffect(() => {
    let currentIndex = 0;
    const placeholderText = "닉네임을 입력하세요.";

    const interval = setInterval(() => {
      if (currentIndex <= placeholderText.length) {
        setPlaceholder(placeholderText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 비디오 배경 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-[-2] pointer-events-none"
      >
        <source src="/122966-726547935_small.mp4" type="video/mp4" />
      </video>
      {/* 오버레이(배경만 어둡게, 콘텐츠에는 영향 없음) */}
      <div
        className="fixed top-0 left-0 w-full h-full"
        style={{
          background: "rgba(24,24,28,0.7)",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
      {/* 실제 콘텐츠: z-index 기본값(1 이상) */}
      <Header />
      <div className="flex flex-col items-center mt-[-48px] relative z-10">
        <img
          src={logo}
          alt="F.INFO 메인 로고"
          className="w-96 mb-[-80px]"
        />
        <div className="w-[600px] flex shadow-lg rounded-[30px] overflow-hidden bg-black border-[3px] border-green-500">
          <form onSubmit={handleSubmit} className="flex w-full">
            <input
              type="text"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-6 py-4 bg-black text-white text-lg rounded-l-[18px] focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-4 bg-[#333] text-white text-lg rounded-r-[18px] hover:bg-[#444] transition duration-300"
            >
              검색
            </button>
          </form>
        </div>
        <div className="w-full flex flex-col items-center mt-16">
          <div className="flex justify-center gap-4">
            {/* 공지1 */}
            <a
              href="https://fconline.nexon.com/news/notice/view?n4articlesn=5432"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#18181c] rounded-2xl shadow-md overflow-hidden border border-[#222] hover:shadow-lg transition hover:scale-105"
              style={{ width: 270 }}
            >
              <img
                src={공지1}
                alt="공지 이미지"
                className="w-full h-40 object-cover object-center"
              />
              <div className="px-5 pt-4 pb-3">
                <div className="text-white text-base font-semibold leading-tight mb-2 line-clamp-2">
                  6/30(월) 마일리지 초기화 일정 및 정책 안내
                </div>
                <div className="text-[#bdbdbd] text-sm leading-snug mb-4 line-clamp-3">
                  2025.6.30(월) 오후 11시 59분에 구단주님께서 보유하고 계신 모든 마일리지가 초기화될 예정입니다. 마일리지를 보유하고 계신 구단주님께서는 6/30(월) 오후 11시 59분까지 마일리지를 모두 사용해주시기 바랍니다.
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#36d399] text-xs font-semibold">공지</span>
                  <span className="text-[#bdbdbd] text-xs">2025-06-12</span>
                </div>
              </div>
            </a>
            {/* 공지2 */}
            <a
              href="https://fconline.nexon.com/news/notice/view?n4articlesn=5410"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#18181c] rounded-2xl shadow-md overflow-hidden border border-[#222] hover:shadow-lg transition hover:scale-105"
              style={{ width: 270 }}
            >
              <img
                src={공지2}
                alt="공지 이미지"
                className="w-full h-40 object-cover object-center"
              />
              <div className="px-5 pt-4 pb-3">
                <div className="text-white text-base font-semibold leading-tight mb-2 line-clamp-2">
                  GM네로의 하프타임 73화 (LE)
                </div>
                <div className="text-[#bdbdbd] text-sm leading-snug mb-4 line-clamp-3">
                  유럽 대항전에서 팀을 결승로 이끈 선수들로 구성된 LE(Legend of Europa) 클래스 업데이트가 준비되어 있습니다. 자세한 업데이트 내용은 하프타임 73화와 한 장 요약 이미지를 통해 확인하실 수 있습니다.
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#36d399] text-xs font-semibold">공지</span>
                  <span className="text-[#bdbdbd] text-xs">2025-05-29</span>
                </div>
              </div>
            </a>
            {/* 공지3 */}
            <a
              href="https://fconline.nexon.com/news/notice/view?n4articlesn=5307"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#18181c] rounded-2xl shadow-md overflow-hidden border border-[#222] hover:shadow-lg transition hover:scale-105"
              style={{ width: 270 }}
            >
              <img
                src={공지3}
                alt="공지 이미지"
                className="w-full h-40 object-cover object-center"
              />
              <div className="px-5 pt-4 pb-3">
                <div className="text-white text-base font-semibold leading-tight mb-2 line-clamp-2">
                  기준가 및 하한가 배율 임시 적용 관련 안내
                </div>
                <div className="text-[#bdbdbd] text-sm leading-snug mb-4 line-clamp-3">
                  구단주님께서 원활하게 이적시장을 이용하실 수 있도록 기준가 배율 임시 상향 및 하한가 배율 확대 적용, 신규 선수 대상 기준가 변동 규칙 임시 적용 등 다양한 정책이 시행되고 있습니다. 자세한 내용은 공지사항을 참고해주세요.
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#36d399] text-xs font-semibold">공지</span>
                  <span className="text-[#bdbdbd] text-xs">2024-03-29</span>
                </div>
              </div>
            </a>
            {/* 공지4 */}
            <a
              href="https://fconline.nexon.com/news/notice/view?n4articlesn=5302"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#18181c] rounded-2xl shadow-md overflow-hidden border border-[#222] hover:shadow-lg transition hover:scale-105"
              style={{ width: 270 }}
            >
              <img
                src={공지4}
                alt="공지 이미지"
                className="w-full h-40 object-cover object-center"
              />
              <div className="px-5 pt-4 pb-3">
                <div className="text-white text-base font-semibold leading-tight mb-2 line-clamp-2">
                  유료화 상품 판매 안내 (4/24 기준)
                </div>
                <div className="text-[#bdbdbd] text-sm leading-snug mb-4 line-clamp-3">
                  4월 24일(목) 기준 판매중인 유료화 상품 안내입니다. 신규 출시 및 기존 상품의 판매 위치, 구매 제한 등 상세 내용은 공지사항을 참고해주세요.
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#36d399] text-xs font-semibold">공지</span>
                  <span className="text-[#bdbdbd] text-xs">2025-04-24</span>
                </div>
              </div>
            </a>
          </div>
          {/* 배너 영역 */}
          <div className="w-full flex justify-center gap-1 mt-12 mb-1">
            <a
              href="https://events.fconline.nexon.com/250619/iconmatch?utm_source=pc&utm_medium=list&utm_campaign=250619_iconmatch"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={배너1}
                alt="배너1"
                className="h-16 rounded-lg shadow-md hover:scale-105 transition"
              />
            </a>
            <a
              href="https://events.fconline.nexon.com/250515/awards?utm_source=pc&utm_medium=TI&utm_campaign=250515_7thawards"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={배너2}
                alt="배너2"
                className="h-16 rounded-lg shadow-md hover:scale-105 transition"
              />
            </a>
            <a
              href="https://events.fconline.nexon.com/250424/play?utm_source=pc&utm_medium=list&utm_campaign=250424_play"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={배너3}
                alt="배너3"
                className="h-16 rounded-lg shadow-md hover:scale-105 transition"
              />
            </a>
            <a
              href="https://events.fconline.nexon.com/collabo250515/collabo?utm_source=pc&utm_medium=boardThumb&utm_campaign=250515_collabo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={배너4}
                alt="배너4"
                className="h-16 rounded-lg shadow-md hover:scale-105 transition"
              />
            </a>
          </div>
          <div className="w-full flex justify-center gap-1 mt-0 mb-12">
            <a
              href="https://events.fconline.nexon.com/TheIconRoad?utm_source=pc&utm_medium=boardThumb&utm_campaign=iconroad"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={배너5}
                alt="배너5"
                className="h-16 rounded-lg shadow-md hover:scale-105 transition"
              />
            </a>
            <a
              href="https://events.fconline.nexon.com/GroundN/Index"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={배너6}
                alt="배너6"
                className="h-16 rounded-lg shadow-md hover:scale-105 transition"
              />
            </a>
            <a
              href="https://events.fconline.nexon.com/250612/pointmilestone?utm_source=pc&utm_medium=list&utm_campaign=250612_pointmilestone"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={배너7}
                alt="배너7"
                className="h-16 rounded-lg shadow-md hover:scale-105 transition"
              />
            </a>
            <a
              href="https://events.fconline.nexon.com/250116/clan25?utm_source=pc&utm_medium=list&utm_campaign=250116_clan25"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={배너8}
                alt="배너8"
                className="h-16 rounded-lg shadow-md hover:scale-105 transition"
              />
            </a>
          </div>
        </div>
      </div>
      <main className="flex-1 flex flex-col items-center"></main>
      <Footer />
    </div>
  );
};

export default Fhome;
