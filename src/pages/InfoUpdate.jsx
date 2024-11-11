import React, { useState } from "react";
import {
  Layout,
  Typography,
  Button,
  Radio,
  Card,
  Row,
  Col,
  Menu,
  Input,
} from "antd";
import { useNavigate, Link } from "react-router-dom";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;

const InfoUpdate = () => {
  const [form, setForm] = useState({
    email: "abc@email.com",
    name: "홍길동",
    phone: "010-1234-5678",
    notification: "enabled",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      let phoneValue = value.replace(/[^0-9]/g, "");
      if (phoneValue.length <= 11) {
        if (phoneValue.length > 3 && phoneValue.length <= 7) {
          phoneValue = `${phoneValue.slice(0, 3)}-${phoneValue.slice(3)}`;
        } else if (phoneValue.length > 7) {
          phoneValue = `${phoneValue.slice(0, 3)}-${phoneValue.slice(
            3,
            7
          )}-${phoneValue.slice(7)}`;
        }
        setForm({ ...form, [name]: phoneValue });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSave = () => {
    console.log("Form data saved:", form);
  };

  const handleCancel = () => {
    navigate("/my/info");
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
            defaultSelectedKeys={["3"]}
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
        <Content
          style={{
            maxWidth: "950px",
            margin: "0 auto",
            padding: "24px",
            background: "white",
          }}
        >
          <Title level={3} style={{ marginBottom: "24px" }}>
            회원정보 수정
          </Title>
          <Card
            style={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
              marginBottom: "24px",
              height: "250px",
            }}
            bodyStyle={{ padding: 0 }}
          >
            <div
              style={{
                background: "#007BFF",
                padding: "10px 20px",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                color: "white",
              }}
            >
              <Text strong style={{ fontSize: "16px", color: "white" }}>
                회원정보
              </Text>
            </div>
            <div style={{ padding: "20px" }}>
              <Row style={{ marginBottom: "16px" }} align="middle">
                <Col span={6}>
                  <Text style={{ fontWeight: "bold", fontSize: "14px" }}>
                    이메일
                  </Text>
                </Col>
                <Col span={18}>
                  <Input
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    style={{ marginTop: "5px" }}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "16px" }} align="middle">
                <Col span={6}>
                  <Text style={{ fontWeight: "bold", fontSize: "14px" }}>
                    이름
                  </Text>
                </Col>
                <Col span={18}>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    style={{ marginTop: "5px" }}
                  />
                </Col>
              </Row>
              <Row align="middle">
                <Col span={6}>
                  <Text style={{ fontWeight: "bold", fontSize: "14px" }}>
                    휴대폰 번호
                  </Text>
                </Col>
                <Col span={18}>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    style={{ marginTop: "5px" }}
                  />
                </Col>
              </Row>
            </div>
          </Card>
          <Card
            style={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
            }}
            bodyStyle={{ padding: 0 }}
          >
            <div
              style={{
                background: "#007BFF",
                padding: "10px 20px",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                color: "white",
              }}
            >
              <Text strong style={{ fontSize: "16px", color: "white" }}>
                알림 설정
              </Text>
            </div>
            <div style={{ padding: "20px" }}>
              <Row align="middle">
                <Col span={6}>
                  <Text style={{ fontWeight: "bold", fontSize: "14px" }}>
                    이메일
                  </Text>
                </Col>
                <Col span={18}>
                  <Radio.Group
                    name="notification"
                    value={form.notification}
                    onChange={handleInputChange}
                  >
                    <Radio value="enabled">허용</Radio>
                    <Radio value="disabled">비허용</Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </div>
          </Card>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "24px",
            }}
          >
            <Button
              onClick={handleCancel}
              style={{
                marginRight: "16px",
                backgroundColor: "white",
                color: "black",
              }}
            >
              취소
            </Button>
            <Button
              type="primary"
              onClick={handleSave}
              style={{
                backgroundColor: "#007BFF",
                borderColor: "#007BFF",
                color: "white",
              }}
            >
              저장
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default InfoUpdate;
