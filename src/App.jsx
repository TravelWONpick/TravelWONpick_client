import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import { message } from "antd";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";

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
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="App">
      {!isLoginPage && <Header />}
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
        <Route path="/event-detail/:id" element={<EventDetail />} />

        {/* 사용자 마이페이지 전용 라우트 */}
        <Route
          path="/my/flights"
          element={
            <UserRoute>
              <Flight />
            </UserRoute>
          }
        />
        <Route
          path="/my/flight-detail"
          element={
            <UserRoute>
              <FlightDetail />
            </UserRoute>
          }
        />
        <Route
          path="/my/flight-detail/:reservationId"
          element={
            <UserRoute>
              <FlightDetail />
            </UserRoute>
          }
        />
        <Route
          path="/my/passenger"
          element={
            <UserRoute>
              <Passenger />
            </UserRoute>
          }
        />
        <Route
          path="/my/passenger/register"
          element={
            <UserRoute>
              <PassengerRegister />
            </UserRoute>
          }
        />
        <Route
          path="/my/passenger/update"
          element={
            <UserRoute>
              <PassengerUpdate />
            </UserRoute>
          }
        />
        <Route
          path="/my/info"
          element={
            <UserRoute>
              <Info />
            </UserRoute>
          }
        />
        <Route
          path="/my/info/update"
          element={
            <UserRoute>
              <InfoUpdate />
            </UserRoute>
          }
        />

        {/* 로그인 및 기타 페이지 */}
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* 관리자 전용 라우트 */}
        <Route
          path="/admin/userget"
          element={
            <AdminRoute>
              <UserGet />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/monitoring"
          element={
            <AdminRoute>
              <Monitoring />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/log-dashboard"
          element={
            <AdminRoute>
              <LogDashBoard />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
