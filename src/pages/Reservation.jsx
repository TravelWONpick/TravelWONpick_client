import React, { useState } from "react";
import { Card, Button, Row, Col, Select, Input } from "antd";
import { DateRange } from "react-date-range";
import { SwapOutlined } from "@ant-design/icons";
import { ko } from "date-fns/locale"; // 한국어 로케일 추가
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 테마 스타일
import "./Reservation.css"; // Reservation 컴포넌트 스타일

const { Option } = Select;

// AdultCounter 컴포넌트
const AdultCounter = ({ value, onChange }) => {
  const handleIncrease = () => {
    onChange(value + 1);
  };

  const handleDecrease = () => {
    onChange(value > 1 ? value - 1 : 1);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // 버튼을 가운데 정렬
        marginLeft: "-10%", // 왼쪽에서 살짝 떨어지도록 설정
      }}
    >
      <h4 style={{ marginRight: "20px" }}>성인</h4>
      <Button onClick={handleDecrease} style={{ width: "40px" }}>
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
      <Button onClick={handleIncrease} style={{ width: "40px" }}>
        +
      </Button>
    </div>
  );
};

const Reservation = () => {
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [tripType, setTripType] = useState("round"); // 왕복/편도 선택 상태 관리
  const [departure, setDeparture] = useState("ICN");
  const [destination, setDestination] = useState("KIX");
  const [adultCount, setAdultCount] = useState(1); // 성인 인원 수 상태 관리

  // 출발지와 도착지를 교환하는 함수
  const handleSwap = () => {
    setDeparture(destination);
    setDestination(departure);
  };

  const handleSelect = (ranges) => {
    // 날짜 선택 시 호출되는 함수
    setSelectedRange([ranges.selection]);
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

      {/* 왕복/편도 선택 탭 */}
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
        {/* 왼쪽: 달력 */}
        <Col span={14}>
          <Card
            style={{
              height: "430px", // 두 컴포넌트의 높이를 동일하게 설정
            }}
          >
            <DateRange
              editableDateInputs={true}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              ranges={selectedRange}
              locale={ko} // 달력의 로케일을 한국어로 변경
              style={{ width: "100%" }} // 카드의 너비에 맞추어 달력 너비를 조정
            />
          </Card>
        </Col>

        {/* 오른쪽: 출발지, 도착지, 인원 선택 및 검색 */}
        <Col span={10}>
          <Card
            style={{
              height: "430px", // 두 컴포넌트의 높이를 동일하게 설정
            }}
          >
            <div className="calendar-and-settings">
              <div style={{ marginBottom: "70px" }}>
                <h3
                  style={{
                    marginBottom: "30px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  출발지 및 도착지 선택
                </h3>
                <Row align="middle" gutter={[16, 16]}>
                  <Col span={10} style={{ textAlign: "center" }}>
                    <div>
                      <h4 style={{ color: "#888" }}>출발</h4>
                      <Select
                        value={departure}
                        onChange={setDeparture}
                        style={{ width: "100%" }}
                      >
                        <Option value="ICN">인천 ICN</Option>
                        {/* 여기 옵션에 db에서 받아와야함 */}
                        <Option value="GMP">김포 GMP</Option>
                        <Option value="PUS">부산 PUS</Option>
                      </Select>
                    </div>
                  </Col>

                  <Col span={4} style={{ textAlign: "center" }}>
                    <Button
                      shape="circle"
                      icon={<SwapOutlined />}
                      onClick={handleSwap}
                      style={{
                        backgroundColor: "#d9d9d9",
                        border: "none",
                      }}
                    />
                  </Col>

                  <Col span={10} style={{ textAlign: "center" }}>
                    <div>
                      <h4 style={{ color: "#888" }}>도착</h4>
                      <Select
                        value={destination}
                        onChange={setDestination}
                        style={{ width: "100%" }}
                      >
                        <Option value="KIX">오사카 KIX</Option>
                        <Option value="NRT">도쿄 NRT</Option>
                        <Option value="LAX">로스엔젤레스 LAX</Option>
                      </Select>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* 인원 선택 */}
              <div style={{ marginBottom: "70px" }}>
                <h3
                  style={{
                    marginBottom: "30px",
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
                <Button type="primary" style={{ width: "80%" }}>
                  검색
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 검색 결과 */}
      <div className="flights-results">
        <h3 style={{ fontWeight: "bold", marginTop: "20px" }}>가는편 선택</h3>
        {/* 항공편 결과가 여기에 표시됩니다. */}
        <Card style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Row align="middle">
            <Col span={6}>
              <div style={{ fontWeight: "bold" }}>티웨이항공</div>
              <div>수하물 15kg</div>
            </Col>
            <Col span={4}>07:55 - 09:55</Col>
            <Col span={4}>2시간</Col>
            <Col span={4}>
              <div style={{ fontWeight: "bold" }}>310,500원</div>
              <div>우리카드 할인</div>
            </Col>
            <Col span={6} style={{ textAlign: "right" }}>
              <Button type="primary">선택</Button>
            </Col>
          </Row>
        </Card>

        <Card style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Row align="middle">
            <Col span={6}>
              <div style={{ fontWeight: "bold" }}>진에어</div>
              <div>수하물 15kg</div>
            </Col>
            <Col span={4}>08:00 - 09:45</Col>
            <Col span={4}>1시간 45분</Col>
            <Col span={4}>
              <div style={{ fontWeight: "bold" }}>299,300원</div>
              <div>우리카드 할인</div>
            </Col>
            <Col span={6} style={{ textAlign: "right" }}>
              <Button type="primary">선택</Button>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Reservation;
