import React, { useState } from "react";
import { Card, Button, Row, Col, Typography, Space } from "antd";
import { useSelector } from "react-redux";
import FlightCard from "../components/FlightCard";
import { useNavigate } from "react-router-dom"; // useNavigate 추가

const { Title, Text } = Typography;

const Payment = () => {
    const [showOutboundDetails, setShowOutboundDetails] = useState(false);
    const [showInboundDetails, setShowInboundDetails] = useState(false);
    const navigate = useNavigate();
  // Redux store에서 데이터 가져오기
    const { selectedOutbound, selectedReturn, adultCount, tripType, totalPrice } =
      useSelector((state) => state.flight.flightInfo);

    const { passengers } = useSelector((state) => state.flight.passengerInfo);

    // 임시 예약자 정보 (API 연동 전까지 사용)
    const bookerInfo = {
      name: "홍길동",
      email: "hong@example.com",
      phone: "010-1234-5678",
    };

    const date = (timeStr) => {
        return new Date(timeStr)
            .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .replace(/\. /g, ".")
            .slice(0, -1);
    };

    return (
        <div className="flex justify-center w-full bg-white">
            <div className="w-full max-w-[950px] mx-auto p-5 pt-8 min-h-[80vh] bg-white">
                <Row gutter={[24, 24]}>
                    <Col span={16}>
                        {/* 예약편 정보 */}
                        <Card className="border border-solid border-[#e3e3e3] rounded-lg">
                            <div className="p-5">
                                <Title
                                    level={3}
                                    className="mb-5 font-bold text-[#333]"
                                >
                                    예약편 정보
                                </Title>

                {/* 가는편 */}
                {selectedOutbound && (
                  <FlightCard
                    flightData={selectedOutbound}
                    isVisible={showOutboundDetails}
                    onToggle={() =>
                      setShowOutboundDetails(!showOutboundDetails)
                    }
                  />
                )}

                {/* 오는편 */}
                {tripType === "round" && selectedReturn && (
                  <FlightCard
                    flightData={selectedReturn}
                    isVisible={showInboundDetails}
                    onToggle={() => setShowInboundDetails(!showInboundDetails)}
                  />
                )}
              </div>
            </Card>

            {/* 예약자 정보 (임시 데이터) */}
            <Card className="mt-6 border border-solid border-[#e3e3e3] rounded-lg">
              <div className="p-5">
                <Title level={3} className="mb-5 font-bold text-[#333]">
                  예약자 정보
                </Title>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text type="secondary" className="text-[#888]">
                      이름
                    </Text>
                    <div className="font-medium">{bookerInfo.name}</div>
                  </div>
                  <div>
                    <Text type="secondary" className="text-[#888]">
                      이메일
                    </Text>
                    <div className="font-medium">{bookerInfo.email}</div>
                  </div>
                  <div>
                    <Text type="secondary" className="text-[#888]">
                      연락처
                    </Text>
                    <div className="font-medium">{bookerInfo.phone}</div>
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
                {passengers.map((passenger, index) => (
                  <div
                    key={index}
                    className="border border-solid border-[#e3e3e3] rounded-lg p-4 mb-4 last:mb-0"
                  >
                    <Title level={5} className="font-bold text-[#333]">
                      탑승객 {index + 1}
                    </Title>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <Text type="secondary" className="text-[#888]">
                          영문 성
                        </Text>
                        <div className="font-medium">{passenger.lastName}</div>
                      </div>
                      <div>
                        <Text type="secondary" className="text-[#888]">
                          영문 이름
                        </Text>
                        <div className="font-medium">{passenger.firstName}</div>
                      </div>
                      <div>
                        <Text type="secondary" className="text-[#888]">
                          생년월일
                        </Text>
                        <div className="font-medium">{passenger.birthDate}</div>
                      </div>
                      <div>
                        <Text type="secondary" className="text-[#888]">
                          성별
                        </Text>
                        <div className="font-medium">{passenger.gender}</div>
                      </div>
                      <div>
                        <Text type="secondary" className="text-[#888]">
                          연락처
                        </Text>
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
                    className="w-full mt-5 h-10 bg-[#007bff] hover:bg-[#0056b3]"
                    onClick={() =>
                        navigate("/checkout", {
                            state: {
                                totalPrice: totalPrice,
                                passengerCount: adultCount
                            },
                        })
                    } // navigate로 경로와 상태 전달
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
