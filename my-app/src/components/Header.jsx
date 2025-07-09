import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // 로고 이미지 경로

const Header = () => {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (nickname.trim()) {
      navigate(`/search?nickname=${encodeURIComponent(nickname)}`);
      setNickname(""); // 검색 후 입력창 비우기
    }
  };

  return (
    <header className="w-full bg-black border-b border-gray-700 py-1 px-2 sticky top-0 z-50">
      <div className="flex items-center h-14 justify-between">
        <div className="flex flex-row gap-4 items-center text-white">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="F.INFO 로고" className="w-32 cursor-pointer" />
          </Link>
          <div className="flex gap-4 text-white text-m font-bold">
            <Link to="/player">
              <span className="hover:text-cyan-300 transition duration-300 cursor-pointer">랭킹</span>
            </Link>
            |
            <Link to="/community">
              <span className="hover:text-cyan-300 transition duration-300 cursor-pointer">공지</span>
            </Link>
          </div>
        </div>
        {/* 검색창: 작고 심플하게 */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-sm flex flex-row items-center border-2 border-neutral-800 bg-neutral-900 rounded-full overflow-hidden"
        >
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="닉네임 검색"
            className="px-3 py-2 w-full bg-neutral-900 focus:outline-none border-none text-white"
          />
          <button
            type="submit"
            className="px-4 whitespace-nowrap py-2 text-white bg-neutral-800 hover:bg-neutral-700 hover:text-green-400 transition duration-300 rounded-r-md"
          >
            검색
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
