import React, { useState } from "react";
import { Layout, Menu, Typography, Button, Row, Col, Card, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;

const initialData = [
  {
    key: '1',
    name: 'KIM / SANGMIN',
    gender: '남성',
    birthDate: '1994.05.31',
    phone: '010-1234-5678',
  },
  {
    key: '2',
    name: 'PARK / SANGMIN',
    gender: '남성',
    birthDate: '1997.02.12',
    phone: '010-1423-5678',
  },
];

const Passenger = () => {
  const [data, setData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const navigate = useNavigate();

  const showDeleteModal = (key) => {
    setSelectedKey(key);
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    const updatedData = data.filter(record => record.key !== selectedKey);
    setData(updatedData);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddPassenger = () => {
    navigate('/my/passenger/register');
  };

  const handleUpdatePassenger = () => {
    navigate('/my/passenger/update');
  };

  return (
    <Layout style={{
      minHeight: '80vh',
      background: 'white',
      width: '100%',
      maxWidth: '950px',
      margin: '0 auto',
      paddingLeft: '20px',
      paddingRight: '20px'
    }}>
      <div style={{ padding: '20px 24px' }}>
        <Title level={3}>
          "OOO님, 즐거운 비행 되시길 바랍니다!"
        </Title>
      </div>
      <Layout>
        <Sider width={200} style={{ background: 'white' }}>
          <Menu
            mode="vertical"
            defaultSelectedKeys={['2']}
            style={{ borderRight: 0 }}
          >
            <ItemGroup key="g1" title={<Text strong style={{ fontSize: '18px', fontWeight: 'bold' }}>나의 예약</Text>}>
              <Menu.Item key="1">
                <Link to="/my/flight" style={{ fontSize: '14px', color: 'inherit', textDecoration: 'none' }}>
                  항공
                </Link>
              </Menu.Item>
            </ItemGroup>
            <ItemGroup key="g2" title={<Text strong style={{ fontSize: '18px', fontWeight: 'bold' }}>정보관리</Text>}>
              <Menu.Item key="2">
                <Link to="/my/passenger" style={{ fontSize: '14px', color: 'inherit', textDecoration: 'none' }}>
                  탑승객 정보
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
              <Link to="/my/info" style={{ fontSize: '14px', color: 'inherit', textDecoration: 'none' }}>
                  나의 회원정보
                </Link>
              </Menu.Item>
            </ItemGroup>
          </Menu>
        </Sider>
        <Layout style={{ background: 'white' }}>
          <Content style={{ padding: "24px", paddingTop: "8px" }}>
            <Title level={5} style={{ fontWeight: "bold", marginBottom: "16px", fontSize: "20px" }}>
              탑승객 정보
            </Title>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "20px",
              }}
            >
              <Button
                style={{ backgroundColor: "#48b648", borderColor: "gray", color: "white" }}
                onClick={handleAddPassenger}
              >
                + 탑승객 추가
              </Button>
            </div>
            {data.map(record => (
              <div key={record.key} style={{ marginBottom: '16px' }}>
                <Row justify="space-between" align="middle" style={{ maxWidth: '400px', backgroundColor: '#007BFF', padding: '10px 20px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', color: 'white' }}>
                  <Col>
                    <b>{record.name}</b>
                  </Col>
                  <Col>
                    <Button style={{ marginRight: '8px' }}
                      onClick={handleAddPassenger}
                    >수정</Button>
                    <Button onClick={() => showDeleteModal(record.key)}>삭제</Button>
                  </Col>
                </Row>
                <Card style={{ maxWidth: '400px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', border: '1px solid #d9d9d9' }}>
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
