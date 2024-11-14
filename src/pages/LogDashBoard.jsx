import React, { useState } from "react";
import { Layout, Menu, Typography, Button, Row, Col, Card, Modal, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;
const { Search } = Input;

const UserGet = () => {
  const userList = [
    {
      name: "홍길동",
      email: "abc@gmail.com",
      mobile: "010-1234-5678",
    },
    {
      name: "김철수",
      email: "def@naver.com",
      mobile: "010-1234-6789",
    },
    {
      name: "이영희",
      email: "qwer@daum.net",
      mobile: "010-2983-6452",
    },
  ];
  const [filteredUserList, setFilteredUserList] = useState(userList);

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
      <h2 className="text-2xl font-bold pb-5" style={{ textAlign: 'left' }}>
        "관리자님! 고생하십니다~!"
      </h2>
      <Layout style={{ background: "white", width: "100%" }}>
        <Sider width={200} style={{ background: "white" }}>
          <Menu mode="vertical" defaultSelectedKeys={["1"]} style={{ borderRight: 0 }}>
            <ItemGroup
              key="g1"
              title={
                <Text strong style={{ fontSize: "18px", fontWeight: "bold" }}>
                  서비스 관리
                </Text>
              }
            >
              <Menu.Item key="1">
                <Link
                  to="/admin/userget"
                  style={{ fontSize: "14px", color: "inherit", textDecoration: "none" }}
                >
                  회원 관리
                </Link>
              </Menu.Item>
            </ItemGroup>
            <ItemGroup
              key="g2"
              title={
                <Text strong style={{ fontSize: "18px", fontWeight: "bold" }}>
                  데이터 관리
                </Text>
              }
            >
              <Menu.Item key="2">
                <Link
                  to="/admin/monitoring"
                  style={{ fontSize: "14px", color: "inherit", textDecoration: "none" }}
                >
                  모니터링
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link
                  to="/admin/log-dashboard"
                  style={{ fontSize: "14px", color: "inherit", textDecoration: "none" }}
                >
                  로그 관리
                </Link>
              </Menu.Item>
            </ItemGroup>
          </Menu>
        </Sider>
        <Layout style={{ background: "white", paddingLeft: "20px" }}>
          <Content style={{ padding: "24px", paddingTop: "8px" }}>
            <Title
              level={5}
              style={{ fontWeight: "bold", marginBottom: "16px", fontSize: "20px" }}
            >
              회원 관리
            </Title>
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
              <Search
                placeholder="목록 검색"
                enterButton="Search"
                style={{ width: "300px" }}
                allowClear
                onSearch={(value) => {
                  const filteredUsers = userList.filter(user =>
                    user.email.includes(value) || user.name.includes(value)
                  );
                  setFilteredUserList(filteredUsers);
                }}
              />
            </div>
            {filteredUserList.map((user, index) => (
              <Card key={index} style={{ marginBottom: "10px", padding: "10px" }}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text strong>이메일: {user.email}</Text>
                    <br />
                    <Text>이름: {user.name}</Text>
                    <br />
                    <Text type="secondary">휴대폰번호: {user.mobile}</Text>
                  </Col>
                  <Col>
                    <Button type="primary">탈퇴</Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default UserGet;
