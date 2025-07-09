import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FHome from './pages/F.Home.jsx';
import SearchResult from './pages/searchResult.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FHome />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
// App.jsx
// 이 파일은 F.INFO의 메인 컴포넌트로, 라우팅을 설정하고 홈 페이지와 검색 결과 페이지를 연결합니다.
// React Router를 사용하여 URL 경로에 따라 다른 컴포넌트를 렌더링합니다.