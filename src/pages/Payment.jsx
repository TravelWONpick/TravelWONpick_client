import React, { useState } from "react";
import { Card, Button, Row, Col, Typography, Space } from "antd";
import FlightCard from "./FlightCard";

const { Title, Text } = Typography;

const Payment = () => {
  const [showOutboundDetails, setShowOutboundDetails] = useState(false);
  const [showInboundDetails, setShowInboundDetails] = useState(false);

  // 더미 데이터
  const mockData = {
    flights: {
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
    },
    bookerInfo: {
      name: "홍길동",
      email: "hong@example.com",
      phone: "010-1234-5678",
    },
    passengers: {
      1: {
        lastName: "HONG",
        firstName: "GILDONG",
        birthDate: "1990-01-01",
        gender: "남성",
        phone: "010-1234-5678",
      },
      2: {
        lastName: "KIM",
        firstName: "MINJA",
        birthDate: "1992-03-15",
        gender: "여성",
        phone: "010-2345-6789",
      },
    },
    totalPrice: 600000,
  };

  const date = (timeStr) => {
    return new Date(timeStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '.').slice(0, -1);
  };

  return (
    <div className="flex justify-center w-full bg-white">
      <div className="w-full max-w-[950px] px-4 py-8">
        <Row gutter={[24, 24]}>
          <Col span={16}>
            {/* 예약편 정보 */}
            <Card className="border border-solid border-[#e3e3e3] rounded-lg">
              <div className="p-5">
                <Title level={3} className="mb-5 font-bold text-[#333]">
                  예약편 정보
                </Title>
                
                {/* 가는편 */}
                <FlightCard
                  flightData={mockData.flights.outbound}
                  isVisible={showOutboundDetails}
                  onToggle={() => setShowOutboundDetails(!showOutboundDetails)}
                />

                {/* 오는편 */}
                <FlightCard
                  flightData={mockData.flights.inbound}
                  isVisible={showInboundDetails}
                  onToggle={() => setShowInboundDetails(!showInboundDetails)}
                />
              </div>
            </Card>

            {/* 예약자 정보 */}
            <Card className="mt-6 border border-solid border-[#e3e3e3] rounded-lg">
              <div className="p-5">
                <Title level={3} className="mb-5 font-bold text-[#333]">
                  예약자 정보
                </Title>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text type="secondary" className="text-[#888]">이름</Text>
                    <div className="font-medium">{mockData.bookerInfo.name}</div>
                  </div>
                  <div>
                    <Text type="secondary" className="text-[#888]">이메일</Text>
                    <div className="font-medium">{mockData.bookerInfo.email}</div>
                  </div>
                  <div>
                    <Text type="secondary" className="text-[#888]">연락처</Text>
                    <div className="font-medium">{mockData.bookerInfo.phone}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 탑승객 정보 */}
            <Card className="mt-6 border border-solid border-[#e3e3e3] rounded-lg">
              <div className="p-5">
                <Title level={3} className="mb-5 font-bold text-[#333]">
                  탑승객 정보
                </Title>
                {Object.entries(mockData.passengers).map(([key, passenger]) => (
                  <div 
                    key={key}
                    className="border border-solid border-[#e3e3e3] rounded-lg p-4 mb-4 last:mb-0"
                  >
                    <Title level={5} className="font-bold text-[#333]">
                      탑승객 {key}
                    </Title>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <Text type="secondary" className="text-[#888]">영문 성</Text>
                        <div className="font-medium">{passenger.lastName}</div>
                      </div>
                      <div>
                        <Text type="secondary" className="text-[#888]">영문 이름</Text>
                        <div className="font-medium">{passenger.firstName}</div>
                      </div>
                      <div>
                        <Text type="secondary" className="text-[#888]">생년월일</Text>
                        <div className="font-medium">{passenger.birthDate}</div>
                      </div>
                      <div>
                        <Text type="secondary" className="text-[#888]">성별</Text>
                        <div className="font-medium">{passenger.gender}</div>
                      </div>
                      <div>
                        <Text type="secondary" className="text-[#888]">연락처</Text>
                        <div className="font-medium">{passenger.phone}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* 결제 금액 정보 */}
          <Col span={8} style={{ position: "sticky", top: 20 }}>
            <Card className="border border-solid border-[#e3e3e3] rounded-lg">
              <div className="p-5">
                <Title level={3} className="mb-5 font-bold text-[#333]">
                  총 요금
                </Title>
                <p>성인 {Object.keys(mockData.passengers).length}명</p>
                <p className="text-2xl font-bold">
                  {mockData.totalPrice.toLocaleString()}원
                </p>
                <Text className="text-xs text-gray-500 block mb-4">
                  {(mockData.totalPrice / Object.keys(mockData.passengers).length).toLocaleString()}원 x{" "}
                  {Object.keys(mockData.passengers).length}명
                </Text>
                <Button 
                  type="primary" 
                  className="w-full mt-5 h-10 bg-[#007bff] hover:bg-[#0056b3]"
                >
                  결제하기
                </Button>
                <Text className="text-xs text-gray-500 block mt-2">
                우리카드 결제조건(이용실적 충족시)
                </Text>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Payment;