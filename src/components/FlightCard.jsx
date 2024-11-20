import React from "react";
import { Typography, Space } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

const { Text } = Typography;

const FlightCard = ({ flightData, isVisible, onToggle }) => {
  if (!flightData) return null; // 데이터가 없는 경우 처리

  // API 응답 데이터 구조에 맞게 구조 분해 할당
  const {
    airline,
    flightNumber,
    departurePlace,
    arrivalPlace,
    departureTime,
    arrivalTime,
    departureAirportCode,
    arrivalAirportCode,
    baggage,
    maxSeat
  } = flightData;

  // 날짜와 시간 포맷팅 (안전하게 처리)
  const getFormattedDate = (dateString) => {
    try {
      return dateString
        ? format(parseISO(dateString), "yyyy.MM.dd", { locale: ko })
        : "";
    } catch (error) {
      console.error("Date parsing error:", error);
      return "";
    }
  };

  const getFormattedTime = (dateString) => {
    try {
      return dateString ? format(parseISO(dateString), "HH:mm") : "";
    } catch (error) {
      console.error("Time parsing error:", error);
      return "";
    }
  };

  // 포맷된 날짜/시간
  const date = getFormattedDate(departureTime);
  const formattedDepartureTime = getFormattedTime(departureTime);
  const formattedArrivalTime = getFormattedTime(arrivalTime);

  return (
    <div className="border border-solid border-[#f0f0f0] rounded-lg p-4 mb-4">
      {/* 헤더 부분 */}
      <div className="flex justify-between cursor-pointer" onClick={onToggle}>
        <Space size={16}>
          <div className="bg-black text-white px-3 py-1 rounded">
            {departureAirportCode === "ICN" ? "가는편" : "오는편"}
          </div>
          <Space size={8}>
            <span>{departurePlace}</span>
            <Text type="secondary">{departureAirportCode}</Text>
            <span>→</span>
            <span>{arrivalPlace}</span>
            <Text type="secondary">{arrivalAirportCode}</Text>
          </Space>
        </Space>
        <Space size={16}>
          <span>{date}</span>
          {isVisible ? <UpOutlined /> : <DownOutlined />}
        </Space>
      </div>

      {/* 상세 정보 부분 */}
      {isVisible && (
        <div className="mt-4 border-t border-solid border-[#f0f0f0] pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text type="secondary">항공사</Text>
              <div>{airline}</div>
            </div>
            <div>
              <Text type="secondary">항공편</Text>
              <div>{flightNumber}</div>
            </div>
            <div>
              <Text type="secondary">출발시간</Text>
              <div>{formattedDepartureTime}</div>
            </div>
            <div>
              <Text type="secondary">도착시간</Text>
              <div>{formattedArrivalTime}</div>
            </div>
            <div>
              <Text type="secondary">잔여석</Text>
              <div>{maxSeat}</div>
            </div>
            <div>
              <Text type="secondary">수하물</Text>
              <div>{baggage}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
