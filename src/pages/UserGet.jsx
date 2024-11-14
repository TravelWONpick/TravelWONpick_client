import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography, Button, Row, Col, Card, Modal, Input, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;
const { Search } = Input;

const UserGet = () => {
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/manager/member");
        if (response.status === 200 && response.data && response.data.data) {
          setUserList(response.data.data);
          setFilteredUserList(response.data.data);
        }
      } catch (error) {
        console.error("사용자 목록 조회 중 오류가 발생했습니다:", error);
        message.error("사용자 목록을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    };

    fetchUsers();
  }, []);

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (selectedUser) {
      try {
        const response = await axios.delete("http://localhost:8080/manager/member", {
          params: { email: selectedUser.email },
        });

        if (response.status === 200) {
          message.success("사용자가 성공적으로 삭제되었습니다.");
          setFilteredUserList(filteredUserList.filter((user) => user.email !== selectedUser.email));
          setUserList(userList.filter((user) => user.email !== selectedUser.email));
          setIsModalVisible(false);
        } else {
          message.error("사용자 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("사용자 삭제 중 오류가 발생했습니다:", error);
        message.error("사용자 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
                <Text strong style={{ fontSize: "18px", fontWeight: "bold" }}
                >
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
                    <Text type="secondary">휴대폰번호: {user.phoneNumber}</Text>
                  </Col>
                  <Col>
                    <Button type="primary" onClick={() => showModal(user)}>탈퇴</Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </Content>
        </Layout>
      </Layout>

      <Modal
        title="정말로 탈퇴시키겠습니까?"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="확인"
        cancelText="취소"
      >
        <p>이 작업은 되돌릴 수 없습니다. 계속 진행하시겠습니까?</p>
      </Modal>
    </Layout>
  );
};

export default UserGet;
