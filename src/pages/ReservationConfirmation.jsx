import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FlightCard from "../components/FlightCard";
import PassengerForm from "../components/PassengerForm";
import BookerInfo from "../components/BookerInfo";

const { Text, Title } = Typography;

const ReservationConfirmation = () => {
  const [flights, setFlights] = useState({
    outbound: null,
    inbound: null,
  });
  const [showGoingFlightDetails, setShowGoingFlightDetails] = useState(false);
  const [showReturningFlightDetails, setShowReturningFlightDetails] =
    useState(false);
  const [totalPrice, setTotalPrice] = useState(300000);
  const [passengerCount, setPassengerCount] = useState({ adult: 1 });
  const [passengers, setPassengers] = useState([1]);
  const [passengerForms, setPassengerForms] = useState({});

  // 예약자 정보 state 추가
  const [bookerInfo, setBookerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // 예시 데이터 설정 (실제로는 API에서 받아올 데이터)
    const mockFlights = {
      outbound: {
        bound: 1,
        airline: "대한항공",
        flight_number: "KAL082",
        departure_place: "인천",
        arrival_place: "뉴욕",
        departure_time: "2024-11-04 08:00:00",
        arrival_time: "2024-11-04 09:45:00",
        departure_airport_code: "ICN",
        arrival_airport_code: "NYK",
        baggage: "15KG",
      },
      inbound: {
        bound: 2,
        airline: "아시아나항공",
        flight_number: "KAL086",
        departure_place: "뉴욕",
        arrival_place: "인천",
        departure_time: "2024-11-08 14:00:00",
        arrival_time: "2024-11-08 15:45:00",
        departure_airport_code: "NYK",
        arrival_airport_code: "ICN",
        baggage: "15KG",
      },
    };

    setFlights(mockFlights);
  }, []);

  const handleToggleGoingFlight = () => {
    setShowGoingFlightDetails(!showGoingFlightDetails);
  };

  const handleToggleReturningFlight = () => {
    setShowReturningFlightDetails(!showReturningFlightDetails);
  };

  const handleAddPassenger = () => {
    if (passengers.length < 9) {
      const newPassengerNumber = Math.max(...passengers) + 1;
      setPassengers([...passengers, newPassengerNumber]);
      setPassengerCount({ adult: passengers.length + 1 });
      setTotalPrice(300000 * (passengers.length + 1));
    }
  };

  const handleDeletePassenger = (passengerNumber) => {
    const updatedPassengers = passengers.filter((p) => p !== passengerNumber);
    setPassengers(updatedPassengers);
    setPassengerCount({ adult: updatedPassengers.length });
    setTotalPrice(300000 * updatedPassengers.length);

    const updatedForms = { ...passengerForms };
    delete updatedForms[passengerNumber];
    setPassengerForms(updatedForms);
  };

  const handlePassengerFormChange = (passengerNumber, formData) => {
    setPassengerForms({
      ...passengerForms,
      [passengerNumber]: formData,
    });
  };

  // 예약자 정보 변경 핸들러
  const handleBookerInfoChange = (newInfo) => {
    setBookerInfo(newInfo);
  };

  const handlePayment = () => {
    console.log("Payment processing...", {
      flights,
      bookerInfo, // 예약자 정보 추가
      passengers: passengerForms,
      totalPrice,
      passengerCount,
    });

    // 필수 정보 검증
    if (!bookerInfo.name || !bookerInfo.email || !bookerInfo.phone) {
      alert("예약자 정보를 모두 입력해주세요.");
      return;
    }

    // passengers 객체의 각 탑승객 정보가 모두 입력되었는지 확인
    const isAllPassengersInfoComplete = Object.values(passengerForms).every(
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

    // 모든 검증이 통과되면 다음 페이지로 이동
    // navigate('/payment', { state: { flights, bookerInfo, passengers: passengerForms, totalPrice } });
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

                {flights.outbound && (
                  <FlightCard
                    flightData={flights.outbound}
                    isVisible={showGoingFlightDetails}
                    onToggle={handleToggleGoingFlight}
                  />
                )}

                {flights.inbound && (
                  <FlightCard
                    flightData={flights.inbound}
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
            {passengers.map((passengerNumber) => (
              <PassengerForm
                key={passengerNumber}
                passengerNumber={passengerNumber}
                onFormChange={(formData) =>
                  handlePassengerFormChange(passengerNumber, formData)
                }
                onDelete={handleDeletePassenger}
                isDeleteVisible={passengers.length > 1}
              />
            ))}

            {/* 탑승객 추가 버튼 */}
            {passengers.length < 9 && (
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
                탑승객 추가하기 ({passengers.length}/9)
              </Button>
            )}
          </Col>

          <Col span={8} style={{ position: "sticky", top: 20 }}>
            <Card>
              <div className="p-5">
                <Title level={3} className="mb-5">
                  총 요금
                </Title>
                <p>성인 {passengerCount.adult}명</p>
                <p className="text-2xl font-bold">
                  {totalPrice.toLocaleString()}원
                </p>
                <Text className="text-xs text-gray-500 block mb-4">
                  {(totalPrice / passengers.length).toLocaleString()}원 x{" "}
                  {passengers.length}명
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
