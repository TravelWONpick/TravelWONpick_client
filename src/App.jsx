import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import PricePick from './components/routes/PricePick';
import CardPick from './components/routes/CardPick';
import Event from './components/routes/Event';
import Etc from './components/routes/Etc';
import Login from './components/routes/Login'; 
import MainPage from './components/routes/Etc.jsx';
import EventDetail from './components/routes/EventDetail';

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

function MainContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className='App'>
      {!isLoginPage && <Header />} {/* 로그인 페이지가 아닌 경우에만 Header를 렌더링 */}
      <Routes>
        <Route path="/" element={<PricePick />} />
        <Route path="/pricePick/" element={<PricePick />} />
        <Route path="/cardPick/" element={<CardPick />} />
        <Route path="/event/" element={<Event />} />
        <Route path="/etc/" element={<MainPage />} />
        <Route path="/event-detail" element={<EventDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
