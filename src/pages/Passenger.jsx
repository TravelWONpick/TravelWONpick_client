import React from "react";
import { Layout, Menu, Typography, Button, Table } from "antd";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;

const Passenger = () => {
  const columns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '성별',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
    },
    {
      title: '생년월일',
      dataIndex: 'birthDate',
      key: 'birthDate',
      align: 'center',
    },
    {
      title: '휴대폰 번호',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: '액션',
      key: 'action',
      align: 'center',
      render: () => (
        <>
          <Button style={{ marginRight: '8px' }}>수정</Button>
          <Button>삭제</Button>
        </>
      ),
    },
  ];

  const data = [
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
      birthDate: '1992.05.31',
      phone: '010-1334-5678',
    },
  ];

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
        <div style={{ padding: '20px 24px'}}>
          <Title level={3}>
            "OOO님, 즐거운 비행 되시길 바랍니다!"
          </Title>
        </div>
        <Layout>
          <Sider width={200} style={{ background: 'white'}}>
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
                  <Text style={{ fontSize: '14px' }}>나의 회원정보</Text>
                </Menu.Item>
              </ItemGroup>
            </Menu>
          </Sider>
          <Layout style={{ background: 'white'}}>
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
              <Button style={{ backgroundColor: "#f0f0f0", borderColor: "#d9d9d9" }}>
                + 탑승객 추가
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered
              style={{
                backgroundColor: 'white',
              }}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Passenger;
