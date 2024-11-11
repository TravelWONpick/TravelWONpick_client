import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PricePick from "./pages/PricePick";
import CardPick from "./pages/CardPick";
import Event from "./pages/Event";
import Login from "./pages/Login";
import EventDetail from "./pages/EventDetail";
import Flight from "./pages/Flight";
import FlightDetail from "./pages/FlightDetail";
import Reservation from "./pages/Reservation";
import ReservationConfirmation from "./pages/ReservationConfirmation";
import Payment from "./pages/Payment";
import Passenger from "./pages/Passenger";
import PassengerRegister from "./pages/PassengerRegister";
import PassengerUpdate from "./pages/PassengerUpdate";
import Info from "./pages/Info";
import InfoUpdate from "./pages/InfoUpdate";
import Success from "./pages/Success";
import Fail from "./pages/Fail";


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
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="App">
      {!isLoginPage && <Header />}{" "}
      {/* 로그인 페이지가 아닌 경우에만 Header를 렌더링 */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/pricePick/" element={<PricePick />} />
        <Route path="/pricePick/reservation/" element={<Reservation />} />
        <Route
          path="/pricePick/reservation-confirmation/"
          element={<ReservationConfirmation />}
        />
        <Route path="/pricePick/payment/" element={<Payment />} />
        <Route path="/cardPick/" element={<CardPick />} />
        <Route path="/event/" element={<Event />} />
        <Route path="/event-detail/:id" element={<EventDetail />} />{" "}
        {/* :id 추가 */}
        <Route path="/event-detail" element={<EventDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my/flight" element={<Flight />} />
        <Route path="/my/flight-detail" element={<FlightDetail />} />
        <Route path="/my/passenger" element={<Passenger />} />
        <Route path="/my/passenger/register" element={<PassengerRegister />} />
        <Route path="/my/passenger/update" element={<PassengerUpdate />} />
        <Route path="/my/info" element={<Info />} />
        <Route path="/my/info/update" element={<InfoUpdate />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
      </Routes>
    </div>
  );
}

export default App;
