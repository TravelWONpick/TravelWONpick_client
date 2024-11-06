import React from "react";
import { Button, Row, Typography, Tag } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const { Text } = Typography;

const FlightCard = ({ flightData, isVisible, onToggle }) => {
  const isBound1 = flightData.bound === 1;
  const buttonText = isBound1 ? "가는편" : "오는편";

  // 날짜 포맷팅 함수
  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDay = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return {
      fullDate: `${date.getFullYear()}.${month}.${day}`,
      dateTime: `${month}.${day}(${weekDay}) ${hours}:${minutes}`,
    };
  };

  const departureTime = formatDateTime(flightData.departure_time);
  const arrivalTime = formatDateTime(flightData.arrival_time);

  return (
    <>
      <Row justify="space-between" align="middle" className="mb-5">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="default"
            style={{
              backgroundColor: "#333",
              color: "white",
              marginRight: "8px",
            }}
          >
            {buttonText}
          </Button>
          <Text>
            {flightData.departure_place}{" "}
            <span
              style={{
                color: "#666",
                backgroundColor: "#f0f0f0",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              {flightData.departure_airport_code}
            </span>{" "}
            - {flightData.arrival_place}{" "}
            <span
              style={{
                color: "#666",
                backgroundColor: "#f0f0f0",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              {flightData.arrival_airport_code}
            </span>
          </Text>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Text>{departureTime.fullDate}</Text>
          <Button type="link" onClick={onToggle}>
            {isVisible ? <UpOutlined /> : <DownOutlined />}
          </Button>
        </div>
      </Row>

      {isVisible && (
        <div className="relative pl-6 mb-4">
          {/* 세로선과 점 */}
          <div
            style={{
              position: "absolute",
              left: "10px",
              top: "0",
              bottom: "0",
              width: "2px",
              backgroundColor: "#e0e0e0",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "6px",
              top: "0",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#007bff",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "6px",
              bottom: "0",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#007bff",
            }}
          />

          {/* 출발 정보 */}
          <div className="mb-4">
            <Text strong className="text-lg">
              {departureTime.dateTime}
            </Text>
            <br />
            <Text>
              {flightData.departure_place} {flightData.departure_airport_code}
            </Text>
          </div>

          {/* 항공편 정보 */}
          <div className="mb-4 ml-4">
            <Text type="secondary">
              {flightData.airline} {flightData.flight_number}
            </Text>
            <br />
            <Text type="secondary">1시간 45분 소요 | 일반석</Text>
            <div className="mt-2">
              <Tag color="default">위탁수하물 {flightData.baggage}</Tag>
            </div>
          </div>

          {/* 도착 정보 */}
          <div>
            <Text strong className="text-lg">
              {arrivalTime.dateTime}
            </Text>
            <br />
            <Text>
              {flightData.arrival_place} {flightData.arrival_airport_code}
            </Text>
          </div>
        </div>
      )}
    </>
  );
};

export default FlightCard;
