import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainPage from './pages/MainPage'
import Header from './components/Header';
import Footer from './components/Footer';
import PricePick from './pages/PricePick';
import CardPick from './pages/CardPick';
import Event from './pages/Event';
import Login from './pages/Login'; 
import EventDetail from './pages/EventDetail';
import Flight from './pages/Flight';
import Flight2 from './pages/Flight2';
import FlightDetail from './pages/FlightDetail';
import Passenger from './pages/Passenger';
import PassengerRegister from './pages/PassengerRegister';
import PassengerUpdate from './pages/PassengerUpdate';
import Info from './pages/Info';
import InfoUpdate from './pages/InfoUpdate'

function App() {
  return (
    <BrowserRouter>
      <MainContent />
      <div className="mt-20"></div>
      <Footer />
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
        <Route path="/my/flight" element={<Flight />} />
        <Route path="/my/flight2" element={<Flight2 />} />
        <Route path="/my/flight-detail" element={<FlightDetail />} />
        <Route path="/my/passenger" element={<Passenger />} />
        <Route path="/my/passenger/register" element={<PassengerRegister />} />
        <Route path="/my/passenger/update" element={<PassengerUpdate />} />
        <Route path="/my/info" element={<Info />} />
        <Route path="/my/info/update" element={<InfoUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
