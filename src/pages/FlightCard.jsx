import React from "react";
import { Typography, Space } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const { Text } = Typography;

const FlightCard = ({ flightData, isVisible, onToggle }) => {
  const { bound, airline, flight_number, departure_place, arrival_place, 
          departure_time, arrival_time, departure_airport_code, 
          arrival_airport_code, baggage } = flightData;

  const date = new Date(departure_time).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\. /g, '.').slice(0, -1);

  return (
    <div 
      className="border border-solid border-[#f0f0f0] rounded-lg p-4 mb-4"
    >
      {/* 헤더 부분 */}
      <div 
        className="flex justify-between cursor-pointer"
        onClick={onToggle}
      >
        <Space size={16}>
          <div className="bg-black text-white px-3 py-1 rounded">
            {bound === 1 ? "가는편" : "오는편"}
          </div>
          <Space size={8}>
            <span>{departure_place}</span>
            <Text type="secondary">{departure_airport_code}</Text>
            <span>→</span>
            <span>{arrival_place}</span>
            <Text type="secondary">{arrival_airport_code}</Text>
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
              <div>{flight_number}</div>
            </div>
            <div>
              <Text type="secondary">출발시간</Text>
              <div>{new Date(departure_time).toLocaleTimeString()}</div>
            </div>
            <div>
              <Text type="secondary">도착시간</Text>
              <div>{new Date(arrival_time).toLocaleTimeString()}</div>
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