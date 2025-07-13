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
      setNickname("");
    }
  };

  return (
    <header
      className="w-full sticky top-0 z-50 bg-transparent py-1 px-2"
      style={{
        background: "transparent",
        borderBottom: "none",
        boxShadow: "none",
      }}
    >
      <div className="flex items-center h-14 justify-between">
        <div className="flex flex-row gap-4 items-center text-white drop-shadow-md">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="F.INFO 로고" className="w-32 cursor-pointer" />
          </Link>
          <div className="flex gap-4 text-white text-m font-bold">
            <Link to="/squadmaker">
              <span className="hover:text-green-400 transition duration-300 cursor-pointer">스쿼드메이커</span>
            </Link>
            |
            <Link to="/community">
              <span className="hover:text-green-400 transition duration-300 cursor-pointer">공지</span>
            </Link>
          </div>
        </div>
        {/* 검색창 */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-sm flex flex-row items-center bg-transparent rounded-full overflow-hidden border-2 border-white/60 focus-within:border-green-400 transition duration-600"
          style={{ background: "transparent" }}
        >
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="닉네임 검색"
            className="px-3 py-2 w-full bg-transparent focus:outline-none border-none text-white placeholder-gray-300"
          />
          <button
            type="submit"
            className="px-4 whitespace-nowrap py-2 text-white bg-transparent hover:text-green-400 transition duration-800 rounded-r-md"
            style={{ background: "transparent" }}
          >
            검색
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
