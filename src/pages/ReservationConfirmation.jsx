import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FlightCard from "../components/FlightCard";
import PassengerForm from "../components/PassengerForm";
import BookerInfo from "../components/BookerInfo";

import {
  addPassenger,
  updatePassenger,
  removePassenger,
  setFlightSelection,
} from "../store/flightSlice";

const { Text, Title } = Typography;

const ReservationConfirmation = () => {

  //페이지 넘어가면 맨위로 스크롤 되는 useEffect
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // 선택된 인원 수만큼 빈 승객 폼 초기화
    const initializePassengers = () => {
      const currentPassengerCount = passengers.length;
      console.log(currentPassengerCount)
      if (currentPassengerCount < adultCount) {
        for (let i = currentPassengerCount; i < adultCount; i++) {
          dispatch(
            addPassenger({
              lastName: "",
              firstName: "",
              birthDate: "",
              gender: "",
              phone: "",
            })
          );
        }
      }
    };

    initializePassengers();
  }, []);

  const dispatch = useDispatch();
  const { selectedOutbound, selectedReturn, adultCount, tripType, totalPrice } =
    useSelector((state) => state.flight.flightInfo);
  const { passengers } = useSelector((state) => state.flight.passengerInfo);

  const [showGoingFlightDetails, setShowGoingFlightDetails] = useState(false);
  const [showReturningFlightDetails, setShowReturningFlightDetails] =
    useState(false);

  const [bookerInfo, setBookerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleToggleGoingFlight = () => {
    setShowGoingFlightDetails((prev) => !prev);
  };

  const handleToggleReturningFlight = () => {
    setShowReturningFlightDetails((prev) => !prev);
  };

  const handlePassengerFormChange = (index, formData) => {
    dispatch(
      updatePassenger({
        index,
        data: formData,
      })
    );
  };

  const handleBookerInfoChange = (newInfo) => {
    setBookerInfo(newInfo);
  };

  const handlePayment = () => {
    // 필수 정보 검증
    if (!bookerInfo.name || !bookerInfo.email || !bookerInfo.phone) {
      alert("예약자 정보를 모두 입력해주세요.");
      return;
    }

    // 승객 정보 검증
    const isAllPassengersInfoComplete = passengers.every(
      (passenger) =>
        passenger.lastName &&
        passenger.firstName &&
        passenger.gender &&
        passenger.birthDate &&
        passenger.phone
    );

    if (!isAllPassengersInfoComplete) {
      alert("모든 탑승객의 정보를 입력해주세요.");
      return;
    }

    dispatch(
      setFlightSelection({
        selectedOutbound,
        selectedReturn,
        adultCount,
        tripType,
        passengers,
      })
    );

    navigate("/pricePick/payment");
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[950px] mx-auto p-5 pt-8 min-h-[80vh] bg-white">
        <Row gutter={[24, 24]}>
          <Col span={16}>
            <Card>
              <div className="p-5">
                <Title level={3} className="mb-5">
                  예약편 확인
                </Title>

                {selectedOutbound && (
                  <FlightCard
                    flightData={{
                      ...selectedOutbound,
                      departurePlace:
                        selectedOutbound.departurePlace || "출발지",
                      arrivalPlace: selectedOutbound.arrivalPlace || "도착지",
                    }}
                    isVisible={showGoingFlightDetails}
                    onToggle={handleToggleGoingFlight}
                  />
                )}

                {tripType === "round" && selectedReturn && (
                  <FlightCard
                    flightData={{
                      ...selectedReturn,
                      departurePlace: selectedReturn.departurePlace || "출발지",
                      arrivalPlace: selectedReturn.arrivalPlace || "도착지",
                    }}
                    isVisible={showReturningFlightDetails}
                    onToggle={handleToggleReturningFlight}
                  />
                )}
              </div>
            </Card>

            {/* 예약자 정보 입력 컴포넌트 */}
            <div className="mt-6">
              <BookerInfo
                bookerInfo={bookerInfo}
                onBookerInfoChange={handleBookerInfoChange}
              />
            </div>

            {/* 탑승객 정보 입력 폼들 */}
            {passengers.slice(0, adultCount).map((passenger, index) => (
              <PassengerForm
                key={index}
                passengerNumber={index + 1}
                passengerData={passenger}
                onFormChange={(formData) =>
                  handlePassengerFormChange(index, formData)
                }
                onDelete={() => {}} // 삭제 기능 제거
                isDeleteVisible={false} // 삭제 버튼 숨김
              />
            ))}
          </Col>

          <Col span={8} style={{ position: "sticky", top: 20 }}>
            <Card>
              <div className="p-5">
                <Title level={3} className="mb-5">
                  총 요금
                </Title>
                <p>성인 {adultCount}명</p>
                <p className="text-2xl font-bold">
                  {totalPrice.toLocaleString()}원
                </p>
                <Text className="text-xs text-gray-500 block mb-4">
                  {(totalPrice / adultCount).toLocaleString()}원 x {adultCount}
                  명
                </Text>
                <Button
                  type="primary"
                  className="w-full mt-5"
                  onClick={handlePayment}
                >
                  결제하러 가기
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ReservationConfirmation;
