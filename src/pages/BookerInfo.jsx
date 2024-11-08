import React from "react";
import { Card, Input, Typography } from "antd";

const { Text } = Typography;

const BookerInfo = ({ onBookerInfoChange, bookerInfo }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onBookerInfoChange({
      ...bookerInfo,
      [name]: value,
    });
  };

  return (
    <Card>
      <div className="p-5">
        <Text
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            display: "block",
            marginBottom: "16px",
          }}
        >
          예약자 정보입력
        </Text>
        <Text style={{ color: "#666", display: "block", marginBottom: "24px" }}>
          입력하신 이메일 주소와 연락처로 예약과 관련된 안내가 발송되며, 예약
          조회 시에도 해당 이메일로 인증이 진행되므로 정확한 정보를 입력해
          주세요.
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Text
              style={{ color: "#666", display: "block", marginBottom: "8px" }}
            >
              예약자 이름
            </Text>
            <Input
              name="name"
              placeholder="예약자 이름 을 입력해주세요"
              value={bookerInfo.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Text
              style={{ color: "#666", display: "block", marginBottom: "8px" }}
            >
              이메일 주소
            </Text>
            <Input
              name="email"
              placeholder="email@example.com"
              value={bookerInfo.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Text
              style={{ color: "#666", display: "block", marginBottom: "8px" }}
            >
              휴대폰 번호
            </Text>
            <Input
              name="phone"
              placeholder="010-1234-5678"
              value={bookerInfo.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookerInfo;
