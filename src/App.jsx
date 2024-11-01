import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import MainPage from './pages/MainPage'
import Header from './components/Header';
import PricePick from './pages/PricePick';
import CardPick from './pages/CardPick';
import Event from './pages/Event';
import Login from './pages/Login'; 
import EventDetail from './pages/EventDetail';

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
        <Route path="/" element={<MainPage />} />
        <Route path="/pricePick/" element={<PricePick />} />
        <Route path="/cardPick/" element={<CardPick />} />
        <Route path="/event/" element={<Event />} />
        <Route path="/event-detail" element={<EventDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
