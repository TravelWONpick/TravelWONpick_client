import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Typography, Input } from "antd";

const { Text, Title } = Typography;

const PassengerForm = ({
  onFormChange,
  passengerNumber,
  onDelete,
  isDeleteVisible = true,
}) => {
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    gender: "",
    birthDate: "",
    phone: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    lastName: "",
    firstName: "",
    gender: "",
  });

  useEffect(() => {
    onFormChange(form);
  }, [form]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if ((name === "lastName" || name === "firstName") && value !== "") {
      if (!/^[A-Z]*$/.test(value)) {
        setErrorMessage({
          ...errorMessage,
          [name]: "알파벳 대문자만 입력 가능합니다.",
        });
        return;
      }
    }

    setErrorMessage({
      ...errorMessage,
      [name]: "",
    });
    setForm({ ...form, [name]: value });
  };

  const handleGenderChange = (gender) => {
    setForm({ ...form, gender });
    setErrorMessage({ ...errorMessage, gender: "" });
  };

  const handleBirthDateChange = (e) => {
    let { value } = e.target;
    value = value.replace(/[^0-9]/g, "");
    if (value.length <= 8) {
      if (value.length > 4 && value.length <= 6) {
        value = `${value.slice(0, 4)}.${value.slice(4)}`;
      } else if (value.length > 6) {
        value = `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6)}`;
      }
      setForm({ ...form, birthDate: value });
    }
  };

  const handlePhoneChange = (e) => {
    let { value } = e.target;
    value = value.replace(/[^0-9]/g, "");
    if (value.length <= 11) {
      if (value.length > 3 && value.length <= 7) {
        value = `${value.slice(0, 3)}-${value.slice(3)}`;
      } else if (value.length > 7) {
        value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
      }
      setForm({ ...form, phone: value });
    }
  };

  const handleNumericOnly = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Card
        style={{
          backgroundColor: "#007BFF",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          marginTop: "24px",
        }}
      >
        <div className="flex justify-between items-center">
          <div>
            <Text
              style={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
            >
              탑승객 정보 입력
            </Text>
            <br />
            <Text style={{ fontSize: "13px", color: "white" }}>
              여권상의 정보와 입력정보가 동일해야하며, 오류시 탑승이 거절될 수
              있습니다.
            </Text>
          </div>
          {isDeleteVisible && (
            <Button
              danger
              onClick={() => onDelete(passengerNumber)}
              style={{ marginLeft: "auto" }}
            >
              삭제
            </Button>
          )}
        </div>
      </Card>

      <Card
        style={{
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      >
        <Title level={5} style={{ marginBottom: "24px" }}>
          탑승객 {passengerNumber}
        </Title>
        <Row gutter={[32, 24]} style={{ marginBottom: "16px" }}>
          <Col span={8}>
            <Text
              style={{ fontWeight: "bold", fontSize: "14px", color: "#888" }}
            >
              영문 성
            </Text>
            <Input
              name="lastName"
              placeholder="예: HONG"
              value={form.lastName}
              onChange={handleInputChange}
              style={{ padding: "10px", marginTop: "5px" }}
            />
            <div style={{ height: "20px", marginTop: "5px" }}>
              {errorMessage.lastName && (
                <Text
                  type="danger"
                  style={{ color: "red", whiteSpace: "nowrap" }}
                >
                  {errorMessage.lastName}
                </Text>
              )}
            </div>
          </Col>
          <Col span={8}>
            <Text
              style={{ fontWeight: "bold", fontSize: "14px", color: "#888" }}
            >
              영문 이름
            </Text>
            <Input
              name="firstName"
              placeholder="예: GILDONG"
              value={form.firstName}
              onChange={handleInputChange}
              style={{ padding: "10px", marginTop: "5px" }}
            />
            <div style={{ height: "20px", marginTop: "5px" }}>
              {errorMessage.firstName && (
                <Text
                  type="danger"
                  style={{ color: "red", whiteSpace: "nowrap" }}
                >
                  {errorMessage.firstName}
                </Text>
              )}
            </div>
          </Col>
          <Col span={8}>
            <Text
              style={{ fontWeight: "bold", fontSize: "14px", color: "#888" }}
            >
              성별
            </Text>
            <div style={{ display: "flex", gap: "1px", marginTop: "5px" }}>
              <Button
                type={form.gender === "남성" ? "primary" : "default"}
                onClick={() => handleGenderChange("남성")}
                style={{ width: "100px", height: "40px" }}
              >
                남성
              </Button>
              <Button
                type={form.gender === "여성" ? "primary" : "default"}
                onClick={() => handleGenderChange("여성")}
                style={{ width: "100px", height: "40px" }}
              >
                여성
              </Button>
            </div>
            <div style={{ height: "20px", marginTop: "5px" }}>
              {errorMessage.gender && (
                <Text
                  type="danger"
                  style={{ color: "red", whiteSpace: "nowrap" }}
                >
                  {errorMessage.gender}
                </Text>
              )}
            </div>
          </Col>
        </Row>
        <Row gutter={[32, 24]} style={{ marginBottom: "16px" }}>
          <Col span={8}>
            <Text
              style={{ fontWeight: "bold", fontSize: "14px", color: "#888" }}
            >
              생년월일
            </Text>
            <Input
              name="birthDate"
              placeholder="YYYY.MM.DD"
              value={form.birthDate}
              onChange={handleBirthDateChange}
              onKeyPress={handleNumericOnly}
              style={{ padding: "10px", marginTop: "5px" }}
            />
          </Col>
          <Col span={8}>
            <Text
              style={{ fontWeight: "bold", fontSize: "14px", color: "#888" }}
            >
              휴대폰 번호
            </Text>
            <Input
              name="phone"
              placeholder="000-0000-0000"
              value={form.phone}
              onChange={handlePhoneChange}
              onKeyPress={handleNumericOnly}
              style={{ padding: "10px", marginTop: "5px" }}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default PassengerForm;
