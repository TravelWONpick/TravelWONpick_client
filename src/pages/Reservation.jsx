import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Input, message } from "antd";
import { DateRange } from "react-date-range";
import { ko } from "date-fns/locale";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./Reservation.css";
import { format, parseISO } from "date-fns";

// 항공편 카드 컴포넌트
const FlightCard = ({ flight, onSelect }) => {
  const departureTime = format(parseISO(flight.departureTime), "HH:mm");
  const arrivalTime = format(parseISO(flight.arrivalTime), "HH:mm");

  // 비행 시간 계산
  const calculateDuration = () => {
    const start = new Date(flight.departureTime);
    const end = new Date(flight.arrivalTime);
    const diff = (end - start) / (1000 * 60); // 분 단위로 계산
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}시간 ${minutes}분`;
  };

  return (
    <Card style={{ marginTop: "10px", marginBottom: "10px" }}>
      <Row align="middle">
        <Col span={5}>
          <div style={{ fontWeight: "bold" }}>{flight.airline}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            수하물 {flight.baggage}
          </div>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24} style={{ marginBottom: "4px" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {departureTime}
                </span>
                <span style={{ color: "#666" }}>|</span>
                <span>{flight.departureAirportCode}</span>
              </div>
            </Col>
            <Col span={24}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {arrivalTime}
                </span>
                <span style={{ color: "#666" }}>|</span>
                <span>{flight.arrivalAirportCode}</span>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={5} style={{ textAlign: "center" }}>
          <div style={{ color: "#666" }}>{calculateDuration()}</div>
        </Col>
        <Col span={5}>
          <div style={{ fontWeight: "bold", fontSize: "18px" }}>
            {flight.specialPrice.toLocaleString()}원
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>우리카드</div>
        </Col>
        <Col span={3} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={() => onSelect(flight)}>
            선택
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

// AdultCounter 컴포넌트
const AdultCounter = ({ value, onChange }) => {
  const handleIncrease = () => {
    // 3명을 초과하지 않도록 제한
    if (value < 3) {
      onChange(value + 1);
    }
  };

  const handleDecrease = () => {
    // 1명 미만이 되지 않도록 제한
    if (value > 1) {
      onChange(value - 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "-10%",
      }}
    >
      <h4 style={{ marginRight: "20px" }}>성인</h4>
      <Button
        onClick={handleDecrease}
        style={{ width: "40px" }}
        // 1명일 때는 비활성화
        disabled={value <= 1}
      >
        -
      </Button>
      <Input
        value={value}
        readOnly
        style={{
          width: "50px",
          textAlign: "center",
          margin: "0 10px",
        }}
      />
      <Button
        onClick={handleIncrease}
        style={{ width: "40px" }}
        // 3명일 때는 비활성화
        disabled={value >= 3}
      >
        +
      </Button>
    </div>
  );
};

const Reservation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 이전 페이지에서 전달받은 데이터
  const { sp_id, arrival_airport_code, departure_airport_code } =
    location.state || {};

  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [tripType, setTripType] = useState("round");
  const [departure] = useState(departure_airport_code || "");
  const [destination] = useState(arrival_airport_code || "");
  const [adultCount, setAdultCount] = useState(1);
  const [outboundFlights, setOutboundFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [loading, setLoading] = useState(false);

  // 공항 코드에 따른 도시 이름 매핑
  const airportCodeToCity = {
    ICN: "인천",
    GMP: "김포",
    PUS: "부산",
    KIX: "오사카",
    NRT: "도쿄",
    LAX: "로스엔젤레스",
    DAD: "다낭",
    BKK: "방콕",
  };

  useEffect(() => {
    // if (!sp_id || !arrival_airport_code || !departure_airport_code) {
    //   message.error("잘못된 접근입니다.");
    //   navigate("/pricePick");
    //   return;
    // }

    searchFlights();
  }, [sp_id, arrival_airport_code, departure_airport_code]);

  const handleSelect = (ranges) => {
    setSelectedRange([ranges.selection]);
  };

  const searchFlights = async () => {
    try {
      setLoading(true);

      const departureDate = format(selectedRange[0].startDate, "yyyy-MM-dd");
      const arrivalDate =
        tripType === "round"
          ? format(selectedRange[0].endDate, "yyyy-MM-dd")
          : departureDate;

      const url = `http://localhost:8080/special/${sp_id}?departureDate=${departureDate}&arrivalDate=${arrivalDate}&depAirportCode=${departure}&arrAirportCode=${destination}`;

      // URL 확인
      console.log("요청 URL:", url);

      const response = await axios.get(url);

      // 응답 데이터 확인
      console.log("응답 데이터:", response.data);

      if (response.data.status === 200) {
        setOutboundFlights(response.data.data.outboundFlights);
        if (tripType === "round") {
          setReturnFlights(response.data.data.returnFlights);
        }
        // 설정된 항공편 데이터 확인
        console.log("가는편:", response.data.data.outboundFlights);
        console.log("오는편:", response.data.data.returnFlights);
      } else {
        message.error("항공편 검색에 실패했습니다.");
      }
    } catch (error) {
      // 에러 상세 정보 확인
      console.error("에러 상세 정보:", error.response || error);
      message.error("항공편 검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleOutboundSelect = (flight) => {
    setSelectedOutbound(flight);
    message.success(`가는편 항공편이 선택되었습니다: ${flight.flightNumber}`);
  };

  const handleReturnSelect = (flight) => {
    setSelectedReturn(flight);
    message.success(`오는편 항공편이 선택되었습니다: ${flight.flightNumber}`);
  };

  const handleComplete = () => {
    // 선택된 항공편 정보를 다음 페이지로 전달
    const selectedFlights = {
      outbound: selectedOutbound,
      return: tripType === "round" ? selectedReturn : null,
      adultCount: adultCount,
      tripType: tripType,
    };

    // 다음 페이지로 이동 (예: 예약 상세 페이지)
    navigate("/pricePick/reservation-confirmation", {
      state: selectedFlights,
    });
  };

  return (
    <div
      className="reservation-container"
      style={{ maxWidth: "950px", margin: "0 auto" }}
    >
      <div className="page-title" style={{ marginBottom: "20px" }}>
        <h2 style={{ fontWeight: "bold", fontSize: "24px" }}>
          왕복/편도 선택 및 예약
        </h2>
      </div>

      <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <Button.Group>
          <Button
            type={tripType === "round" ? "primary" : "default"}
            style={{ width: "100px" }}
            onClick={() => setTripType("round")}
          >
            왕복
          </Button>
          <Button
            type={tripType === "oneway" ? "primary" : "default"}
            style={{ width: "100px" }}
            onClick={() => setTripType("oneway")}
          >
            편도
          </Button>
        </Button.Group>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Card style={{ height: "400px" }}>
            <DateRange
              editableDateInputs={true}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              ranges={selectedRange}
              locale={ko}
              style={{
                width: "100%",
                height: "210px", // 높이 추가
                ".rdrCalendarWrapper": {
                  // 달력 래퍼의 높이 조정
                  fontSize: "15px",
                },
              }}
              disabled={
                tripType === "oneway"
                  ? {
                      endDate: true,
                    }
                  : false
              }
            />
          </Card>
        </Col>

        <Col span={10}>
          <Card style={{ height: "400px" }}>
            <div className="calendar-and-settings">
              {/* 출발지 및 도착지 */}
              <div style={{ marginBottom: "40px" }}>
                <h3
                  style={{
                    marginBottom: "20px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  출발지 및 도착지
                </h3>
                <Row align="middle" justify="center" gutter={[16, 16]}>
                  <Col span={8} style={{ textAlign: "center" }}>
                    <div>
                      <h4 style={{ color: "#888", marginBottom: "8px" }}>
                        출발
                      </h4>
                      <div
                        style={{
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "6px",
                          backgroundColor: "#fafafa",
                        }}
                      >
                        <div style={{ fontWeight: "bold" }}>
                          {airportCodeToCity[departure] || departure}
                        </div>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          {departure}
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col
                    span={2}
                    style={{ textAlign: "center", marginTop: "30px" }}
                  >
                    <div style={{ color: "#666" }}>→</div>
                  </Col>

                  <Col span={8} style={{ textAlign: "center" }}>
                    <div>
                      <h4 style={{ color: "#888", marginBottom: "8px" }}>
                        도착
                      </h4>
                      <div
                        style={{
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "6px",
                          backgroundColor: "#fafafa",
                        }}
                      >
                        <div style={{ fontWeight: "bold" }}>
                          {airportCodeToCity[destination] || destination}
                        </div>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          {destination}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div style={{ marginBottom: "40px" }}>
                <h3
                  style={{
                    marginBottom: "20px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  인원 선택
                </h3>
                <AdultCounter value={adultCount} onChange={setAdultCount} />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Button
                  type="primary"
                  style={{ width: "80%" }}
                  onClick={searchFlights}
                  loading={loading}
                >
                  검색
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 검색 결과 섹션 */}
      {outboundFlights.length > 0 && (
        <div className="flights-results">
          {/* 가는편 섹션 */}
          <div style={{ marginTop: "30px" }}>
            <h3
              style={{
                fontWeight: "bold",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              가는편 선택
              {selectedOutbound && (
                <span
                  style={{
                    fontSize: "14px",
                    color: "#52c41a",
                    backgroundColor: "#f6ffed",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {selectedOutbound.flightNumber} 선택됨
                </span>
              )}
            </h3>
            {outboundFlights.map((flight) => (
              <FlightCard
                key={flight.flightId}
                flight={flight}
                onSelect={handleOutboundSelect}
              />
            ))}
          </div>

          {/* 오는편 섹션 (왕복인 경우에만 표시) */}
          {tripType === "round" && returnFlights.length > 0 && (
            <div style={{ marginTop: "30px" }}>
              <h3
                style={{
                  fontWeight: "bold",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                오는편 선택
                {selectedReturn && (
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#52c41a",
                      backgroundColor: "#f6ffed",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {selectedReturn.flightNumber} 선택됨
                  </span>
                )}
              </h3>
              {returnFlights.map((flight) => (
                <FlightCard
                  key={flight.flightId}
                  flight={flight}
                  onSelect={handleReturnSelect}
                />
              ))}
            </div>
          )}

          {/* 선택 완료 버튼 */}
          {outboundFlights.length > 0 && (
            <div
              style={{
                marginTop: "30px",
                marginBottom: "30px",
                textAlign: "center",
              }}
            >
              <Button
                type="primary"
                size="large"
                disabled={
                  !selectedOutbound || (tripType === "round" && !selectedReturn)
                }
                onClick={handleComplete}
              >
                선택 완료
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reservation;
