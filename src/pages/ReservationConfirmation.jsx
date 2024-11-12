import React, { useState } from "react";
import { Card, Button, Row, Col, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
  const dispatch = useDispatch();
  // Redux store에서 데이터 가져오기
  const { selectedOutbound, selectedReturn, adultCount, tripType, totalPrice } =
    useSelector((state) => state.flight.flightInfo);
  const { passengers } = useSelector((state) => state.flight.passengerInfo);

  // 상세 정보 표시 여부를 위한 state 추가
  const [showGoingFlightDetails, setShowGoingFlightDetails] = useState(true); // 기본값을 true로 설정
  const [showReturningFlightDetails, setShowReturningFlightDetails] =
    useState(true); // 기본값을 true로 설정

  const [bookerInfo, setBookerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  // toggle 핸들러 수정
  const handleToggleGoingFlight = () => {
    setShowGoingFlightDetails((prev) => !prev);
  };

  const handleToggleReturningFlight = () => {
    setShowReturningFlightDetails((prev) => !prev);
  };

  const handleAddPassenger = () => {
    if (passengers.length < 3) {
      // 최대 3명으로 제한
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
  };

  const handleDeletePassenger = (index) => {
    dispatch(removePassenger(index));
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

    // Redux store에 승객 정보 저장
    dispatch(
      setFlightSelection({
        selectedOutbound,
        selectedReturn,
        adultCount,
        tripType,
        passengers, // 승객 정보 추가
      })
    );

    // 저장 후 결제 페이지로 이동
    navigate("/pricePick/payment");

    // 저장된 데이터 확인용 로그
    console.log("결제 페이지로 전달되는 정보:", {
      selectedOutbound,
      selectedReturn,
      adultCount,
      tripType,
      totalPrice,
      passengers,
    });
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
            {passengers.map((passenger, index) => (
              <PassengerForm
                key={index}
                passengerNumber={index + 1}
                passengerData={passenger}
                onFormChange={(formData) =>
                  handlePassengerFormChange(index, formData)
                }
                onDelete={() => handleDeletePassenger(index)}
                isDeleteVisible={passengers.length > 1}
              />
            ))}

            {/* 탑승객 추가 버튼 */}
            {passengers.length < 3 && ( // 최대 3명으로 제한
              <Button
                type="dashed"
                onClick={handleAddPassenger}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  height: "50px",
                }}
                icon={<PlusOutlined />}
              >
                탑승객 추가하기 ({passengers.length}/3)
              </Button>
            )}
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
