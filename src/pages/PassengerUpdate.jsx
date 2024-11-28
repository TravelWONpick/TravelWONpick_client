import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography, Input, Button, Row, Col, Card } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;

const PassengerUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [passengerId, setPassengerId] = useState(null);

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
    if (location.state) {
      const { id, lastName, firstName, gender, birthDate, phone } =
        location.state;
      setPassengerId(id); // ID 저장
      setForm({ lastName, firstName, gender, birthDate, phone });
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      (name === "lastName" || name === "firstName") &&
      !/^[A-Z]*$/.test(value)
    ) {
      setErrorMessage({
        ...errorMessage,
        [name]: "알파벳 대문자만 입력 가능합니다.",
      });
    } else {
      setErrorMessage({
        ...errorMessage,
        [name]: "",
      });
      setForm({ ...form, [name]: value });
    }
  };

  const handleGenderChange = (gender) => {
    setForm({ ...form, gender });
    setErrorMessage({ ...errorMessage, gender: "" });
  };

  const handleCancel = () => {
    navigate("/my/passenger");
  };

  const handleSave = async () => {
    if (!form.gender) {
      setErrorMessage({ ...errorMessage, gender: "성별을 선택해 주세요." });
      return;
    }

    // 모든 필수 필드가 입력되었는지 확인
    if (!form.firstName || !form.lastName || !form.birthDate || !form.phone) {
      alert("모든 정보를 입력해 주세요.");
      return;
    }

    try {
      const accessToken = sessionStorage.getItem("accessToken");

      // API 요청에 맞게 데이터 포맷 변환
      const requestData = {
        firstName: form.firstName,
        lastName: form.lastName,
        birth: form.birthDate.replace(/\./g, "-"), // YYYY.MM.DD -> YYYY-MM-DD
        gender: form.gender === "남성" ? "MALE" : "FEMALE",
        phoneNumber: form.phone,
      };

      // PATCH 요청 보내기
      await axios.patch(
        `${import.meta.env.VITE_APP_API_URL}/my/passenger/${passengerId}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      alert("탑승객 정보가 수정되었습니다.");
      navigate("/my/passenger");
    } catch (error) {
      console.error("탑승객 정보 수정 중 오류가 발생했습니다:", error);
      alert(
        error.response?.data?.message || "탑승객 정보 수정에 실패했습니다."
      );
    }
  };

  const handleNumericOnly = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
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

  return (
    <Layout
      style={{
        minHeight: "80vh",
        background: "white",
        width: "100%",
        maxWidth: "950px",
        margin: "0 auto",
        padding: "20px",
        paddingTop: "30px",
      }}
    >
      <h2 className="text-2xl font-bold pb-5">
        "OOO님, 즐거운 비행 되시길 바랍니다!"
      </h2>
      <Layout>
        <Sider width={200} style={{ background: "white" }}>
          <Menu
            mode="vertical"
            defaultSelectedKeys={["2"]}
            style={{ borderRight: 0 }}
          >
            <ItemGroup
              key="g1"
              title={
                <Text strong style={{ fontSize: "18px", fontWeight: "bold" }}>
                  나의 예약
                </Text>
              }
            >
              <Menu.Item key="1">
                <Link
                  to="/my/flight"
                  style={{
                    fontSize: "14px",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  항공
                </Link>
              </Menu.Item>
            </ItemGroup>
            <ItemGroup
              key="g2"
              title={
                <Text strong style={{ fontSize: "18px", fontWeight: "bold" }}>
                  정보관리
                </Text>
              }
            >
              <Menu.Item key="2">
                <Link
                  to="/my/passenger"
                  style={{
                    fontSize: "14px",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  탑승객 정보
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link
                  to="/my/info"
                  style={{
                    fontSize: "14px",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  나의 회원정보
                </Link>
              </Menu.Item>
            </ItemGroup>
          </Menu>
        </Sider>
        <Layout style={{ background: "white" }}>
          <Content style={{ padding: "24px", paddingTop: "8px" }}>
            <Card
              style={{
                backgroundColor: "#007BFF",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
              >
                탑승객 정보 수정
              </Text>
              <br />
              <Text style={{ fontSize: "13px", color: "white" }}>
                여권상의 정보와 입력정보가 동일해야하며, 오류시 탑승이 거절될 수
                있습니다.
              </Text>
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
                탑승객 정보
              </Title>
              <Row gutter={[32, 24]} style={{ marginBottom: "16px" }}>
                <Col span={8}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#888",
                    }}
                  >
                    영문 성
                  </Text>
                  <Input
                    name="lastName"
                    placeholder="예: HONG"
                    value={form.lastName}
                    onChange={handleInputChange}
                    style={{
                      padding: "10px",
                      marginTop: "5px",
                      height: "40px",
                    }}
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
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#888",
                    }}
                  >
                    영문 이름
                  </Text>
                  <Input
                    name="firstName"
                    placeholder="예: GILDONG"
                    value={form.firstName}
                    onChange={handleInputChange}
                    style={{
                      padding: "10px",
                      marginTop: "5px",
                      height: "40px",
                    }}
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
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#888",
                    }}
                  >
                    성별
                  </Text>
                  <div
                    style={{ display: "flex", gap: "1px", marginTop: "5px" }}
                  >
                    <Button
                      type={form.gender === "남성" ? "primary" : "default"}
                      onClick={() => handleGenderChange("남성")}
                      style={{
                        width: "100px",
                        height: "40px",
                        marginRight: "8px",
                      }}
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
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#888",
                    }}
                  >
                    생년월일
                  </Text>
                  <Input
                    name="birthDate"
                    placeholder="YYYY.MM.DD"
                    value={form.birthDate}
                    onChange={handleBirthDateChange}
                    onKeyPress={handleNumericOnly}
                    style={{
                      padding: "10px",
                      marginTop: "5px",
                      height: "40px",
                    }}
                  />
                </Col>
                <Col span={8}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#888",
                    }}
                  >
                    휴대폰 번호
                  </Text>
                  <Input
                    name="phone"
                    placeholder="000-0000-0000"
                    value={form.phone}
                    onChange={handlePhoneChange}
                    onKeyPress={handleNumericOnly}
                    style={{
                      padding: "10px",
                      marginTop: "5px",
                      height: "40px",
                    }}
                  />
                </Col>
              </Row>
            </Card>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "40px",
              }}
            >
              <Button
                style={{
                  marginRight: "16px",
                  fontSize: "16px",
                  height: "40px",
                  width: "120px",
                }}
                onClick={handleCancel}
              >
                취소
              </Button>
              <Button
                type="primary"
                onClick={handleSave}
                style={{
                  fontSize: "16px",
                  height: "40px",
                  width: "120px",
                }}
              >
                저장
              </Button>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PassengerUpdate;
