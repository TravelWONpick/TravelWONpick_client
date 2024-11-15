import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";

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
import Checkout from "./pages/Checkout";
import UserGet from "./pages/UserGet";
import Monitoring from "./pages/Monitoring";
import LogDashBoard from "./pages/LogDashBoard";

function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <MainContent />
            <div className="mt-20"></div>
            <Footer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
  );
}

function MainContent() {
  const location = useLocation();
  const isLoginPage = location.pathname.includes("/login"); // Login 페이지 확인

  return (
      <div className="App">
        {!isLoginPage && <Header />} {/* Login 페이지에서는 Header 숨김 */}
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
          <Route path="/event-detail/:id" element={<EventDetail />} />
          <Route path="/my/flight" element={<Flight />} />
          <Route
              path="/my/flight-detail/:reservationId"
              element={<FlightDetail />}
          />
          <Route path="/my/passenger" element={<Passenger />} />
          <Route path="/my/passenger/register" element={<PassengerRegister />} />
          <Route path="/my/passenger/update" element={<PassengerUpdate />} />
          <Route path="/my/info" element={<Info />} />
          <Route path="/my/info/update" element={<InfoUpdate />} />
          <Route path="/login" element={<Login />} /> {/* /login 경로 추가 */}
          <Route path="/success" element={<Success />} />
          <Route path="/fail" element={<Fail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/userget" element={<UserGet />} />
          <Route path="/admin/monitoring" element={<Monitoring />} />
          <Route path="/admin/log-dashboard" element={<LogDashBoard />} />
        </Routes>
      </div>
  );
}

export default App;
