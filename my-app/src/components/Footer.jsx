import React from "react";

const Footer = ({ className = "" }) => {
  return (
    <footer
      className={`
        w-full
        bg-transparent
        text-gray-300
        text-sm
        pt-10
        pb-6
        ${className}
      `}
      style={{
        background: "transparent",
        borderTop: "none",
        boxShadow: "none",
      }}
    >
      <div className="relative w-full px-6 h-12">
        {/* 왼쪽 영역 */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-start">
          <div className="flex space-x-2 text-sm">
            <span>이용약관</span>
            <span>|</span>
            <span>개인정보 처리방침</span>
          </div>
        </div>

        {/* 가운데 영역 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center leading-relaxed">
          <div>
            주식회사 에이지엠&nbsp;&nbsp;|&nbsp;&nbsp;대표자: 최민락&nbsp;&nbsp;|&nbsp;&nbsp;사업자번호: 646-88-03418
          </div>
          <div>서울특별시 강남구 강남대로 374, B2층 B215호</div>
          <div className="mt-4 text-xs text-gray-400">
            © 2025 주식회사 에이지엠. All rights reserved.
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-end text-right">
          <div>
            <span className="text-xs">[ 문의 ]</span>
            <span className="ml-2">jw00791@naver.com</span>
            <a href="#" className="ml-2 underline">고객센터</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
