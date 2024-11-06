import React, { useState } from "react";
import { Card, Button, Row, Col, Typography, DatePicker } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

const ReservationConfirmation = () => {
  const [showGoingFlightDetails, setShowGoingFlightDetails] = useState(false);
  const [showReturningFlightDetails, setShowReturningFlightDetails] =
    useState(false);

  const navigate = useNavigate();

  const handleToggleGoingFlight = () => {
    setShowGoingFlightDetails(!showGoingFlightDetails);
  };

  const handleToggleReturningFlight = () => {
    setShowReturningFlightDetails(!showReturningFlightDetails);
  };

  const handleCancel = () => {
    navigate("/my/passenger");
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[950px] px-4">
        {/* 예약편 확인 섹션 */}
        <Row gutter={[24, 24]}>
          <Col span={16}>
            <Card>
              <div className="p-5">
                <Title level={3} className="mb-5">
                  예약편 확인
                </Title>

                {/* 가는편 항공편 정보 */}
                <Row justify="space-between" align="middle" className="mb-5">
                  <Col>
                    <Button type="default">가는편</Button>
                  </Col>
                  <Col>
                    <DatePicker defaultValue={null} />
                  </Col>
                  <Col>
                    <Button type="link" onClick={handleToggleGoingFlight}>
                      {showGoingFlightDetails ? (
                        <UpOutlined />
                      ) : (
                        <DownOutlined />
                      )}
                    </Button>
                  </Col>
                </Row>
                {showGoingFlightDetails && (
                  <Card className="mt-2 border border-solid border-gray-200">
                    <Row justify="space-between" align="middle" className="p-2">
                      <Col span={12}>
                        <Text strong>11.04(월) 08:00 인천 ICN</Text>
                        <p>진에어 LJ231 | 1시간 45분 소요 | 일반석</p>
                        <div className="inline-block border border-solid border-gray-300 p-1 rounded">
                          위탁수화물 15kg
                        </div>
                      </Col>
                      <Col span={12} className="text-right">
                        <Text strong>11.04(월) 09:45 오사카 KIX</Text>
                      </Col>
                    </Row>
                  </Card>
                )}

                {/* 오는편 항공편 정보 */}
                <Row
                  justify="space-between"
                  align="middle"
                  className="mb-5 mt-5"
                >
                  <Col>
                    <Button type="default">오는편</Button>
                  </Col>
                  <Col>
                    <DatePicker defaultValue={null} />
                  </Col>
                  <Col>
                    <Button type="link" onClick={handleToggleReturningFlight}>
                      {showReturningFlightDetails ? (
                        <UpOutlined />
                      ) : (
                        <DownOutlined />
                      )}
                    </Button>
                  </Col>
                </Row>
                {showReturningFlightDetails && (
                  <Card className="mt-2 border border-solid border-gray-200">
                    <Row justify="space-between" align="middle" className="p-2">
                      <Col span={12}>
                        <Text strong>11.08(금) 14:00 오사카 KIX</Text>
                        <p>진에어 LJ232 | 1시간 45분 소요 | 일반석</p>
                        <div className="inline-block border border-solid border-gray-300 p-1 rounded">
                          위탁수화물 15kg
                        </div>
                      </Col>
                      <Col span={12} className="text-right">
                        <Text strong>11.08(금) 15:45 인천 ICN</Text>
                      </Col>
                    </Row>
                  </Card>
                )}
              </div>
            </Card>
          </Col>

          {/* 총 요금 및 결제 버튼 */}
          <Col span={8}>
            <Card>
              <div className="p-5">
                <Title level={3} className="mb-5">
                  총 요금
                </Title>
                <p>성인 1명</p>
                <p className="text-2xl font-bold">300,000원</p>
                <Button type="primary" className="w-full mt-5">
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
