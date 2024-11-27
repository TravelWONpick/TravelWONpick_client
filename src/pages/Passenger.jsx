import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography, Button, Row, Col, Card, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;

const Passenger = () => {
  const [data, setData] = useState([]); // initialData 대신 빈 배열로 초기화
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가
  const navigate = useNavigate();

  // API로부터 탑승객 데이터 가져오기
  const fetchPassengers = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("액세스 토큰이 없습니다.");
      }
      const response = await axios.get(`${process.env.VITE_APP_API_URL}/my/passenger`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      // response.data.data가 배열 형태로 오므로 직접 매핑
      const formattedData = response.data.data.map((passenger) => ({
        key: passenger.id.toString(),
        name: `${passenger.lastName} / ${passenger.firstName}`,
        gender: passenger.gender === "MALE" ? "남성" : "여성",
        birthDate: passenger.birth,
        phone: passenger.phoneNumber,
      }));

      setData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error("탑승객 정보 조회 중 오류가 발생했습니다:", error);
      setError("탑승객 정보를 불러오는데 실패했습니다.");
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchPassengers();
  }, []);

  const showDeleteModal = (key) => {
    setSelectedKey(key);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      // DELETE API 호출 - url 파라미터 이름을 up_id로 수정
      await axios.delete(`${process.env.VITE_APP_API_URL}/my/passenger/${selectedKey}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      // 성공적으로 삭제되면 목록 다시 불러오기
      await fetchPassengers();

      // 모달 닫기
      setIsModalVisible(false);

      // 성공 메시지 표시
      alert("탑승객 정보가 삭제되었습니다.");
    } catch (error) {
      console.error("탑승객 삭제 중 오류가 발생했습니다:", error);
      alert(error.response?.data?.message || "탑승객 삭제에 실패했습니다.");
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddPassenger = () => {
    navigate("/my/passenger/register");
  };

  const handleUpdatePassenger = (record) => {
    navigate("/my/passenger/update", {
      state: {
        id: record.key, // 탑승객 ID
        lastName: record.name.split(" / ")[0],
        firstName: record.name.split(" / ")[1],
        gender: record.gender,
        birthDate: record.birthDate,
        phone: record.phone,
      },
    });
  };

  // 로딩 중 표시
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 에러 표시
  if (error) {
    return <div>{error}</div>;
  }

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
        {sessionStorage.getItem("userName")
            ? `${sessionStorage.getItem("userName")}님, 즐거운 비행 되시길 바랍니다!`
            : "OOO님, 즐거운 비행 되시길 바랍니다!"}
      </h2>
      <Layout>
        <Sider width={200} style={{background: "white"}}>
          <Menu
              mode="vertical"
              defaultSelectedKeys={["2"]}
              style={{borderRight: 0}}
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
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: "20px" }}
            >
              <Col>
                <Title
                  level={5}
                  style={{
                    fontWeight: "bold",
                    margin: 0, // 기존 마진 제거
                    fontSize: "20px",
                  }}
                >
                  탑승객 정보
                </Title>
              </Col>
              <Col>
                <Button
                  style={{
                    backgroundColor: "#48b648",
                    color: "white",
                  }}
                  onClick={handleAddPassenger}
                >
                  + 탑승객 추가
                </Button>
              </Col>
            </Row>
            {data.map((record) => (
              <div key={record.key} style={{ marginBottom: "16px" }}>
                <Row
                  justify="space-between"
                  align="middle"
                  style={{
                    maxWidth: "400px",
                    backgroundColor: "#007BFF",
                    padding: "10px 20px",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    color: "white",
                  }}
                >
                  <Col>
                    <b>{record.name}</b>
                  </Col>
                  <Col>
                    <Button
                      style={{ marginRight: "8px" }}
                      onClick={() => handleUpdatePassenger(record)} // record 전달
                    >
                      수정
                    </Button>
                    <Button onClick={() => showDeleteModal(record.key)}>
                      삭제
                    </Button>
                  </Col>
                </Row>
                <Card
                  style={{
                    maxWidth: "400px",
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    border: "1px solid #d9d9d9",
                  }}
                >
                  <Row>
                    <Col span={8}>
                      <b>성별</b>
                      <div>{record.gender}</div>
                    </Col>
                    <Col span={8}>
                      <b>생년월일</b>
                      <div>{record.birthDate}</div>
                    </Col>
                    <Col span={8}>
                      <b>휴대폰 번호</b>
                      <div>{record.phone}</div>
                    </Col>
                  </Row>
                </Card>
              </div>
            ))}

            <Modal
              title="삭제 확인"
              visible={isModalVisible}
              onOk={handleDelete}
              onCancel={handleCancel}
              okText="삭제"
              cancelText="취소"
            >
              <p>정말로 삭제하시겠습니까?</p>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Passenger;
