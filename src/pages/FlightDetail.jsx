// FlightDetail.jsx

import React from "react";
import { Layout, Menu, Typography, Table } from "antd";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;

const FlightDetail = () => {
  const purchaseColumns = [
    { title: "성명", dataIndex: "name", key: "name", align: "center" },
    { title: "매수", dataIndex: "seats", key: "seats", align: "center" },
    {
      title: "항공운임",
      dataIndex: "ticketPrice",
      key: "ticketPrice",
      align: "center",
    },
    {
      title: "할인금액",
      dataIndex: "discount",
      key: "discount",
      align: "center",
    },
    {
      title: "총결제금액",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "center",
    },
  ];

  const scheduleColumns = [
    {
      title: "편명",
      dataIndex: "flightNumber",
      key: "flightNumber",
      align: "center",
    },
    { title: "여정", dataIndex: "route", key: "route", align: "center" },
    {
      title: "출발",
      dataIndex: "departure",
      key: "departure",
      align: "center",
    },
    {
      title: "도착",
      dataIndex: "arrival",
      key: "arrival",
      align: "center",
    },
    { title: "예약좌석", dataIndex: "seat", key: "seat", align: "center" },
  ];

  const passengerColumns = [
    {
      title: "영문 이름",
      dataIndex: "passengerName",
      key: "passengerName",
      align: "center",
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
    },
    {
      title: "생년월일",
      dataIndex: "birthDate",
      key: "birthDate",
      align: "center",
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
  ];

  const purchaseData = [
    {
      key: "1",
      name: "김상민",
      seats: "2",
      ticketPrice: "430,000",
      discount: "50,000",
      totalPrice: "380,000",
    },
  ];

  const scheduleData = [
    {
      key: "1",
      flightNumber: "RS529",
      route: "서울/인천(ICN) → 나트랑(CXR)",
      departure: "2024.06.19 (수) 02:00",
      arrival: "2024.06.19 (수) 09:05",
      seat: "2석",
    },
    {
      key: "2",
      flightNumber: "RS530",
      route: "나트랑(CXR) → 서울/인천(ICN)",
      departure: "2024.06.24 (월) 02:00",
      arrival: "2024.06.24 (월) 09:05",
      seat: "2석",
    },
  ];

  const passengerData = [
    {
      key: "1",
      passengerName: "PARK / JANGWOO",
      gender: "남성",
      birthDate: "2024.06.19",
      phoneNumber: "010-1234-5678",
    },
    {
      key: "2",
      passengerName: "KIM / SANGMIN",
      gender: "남성",
      birthDate: "2021.03.20",
      phoneNumber: "010-1245-8888",
    },
  ];

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
      <h2 className="text-2xl font-bold pb-5">"OOO님, 즐거운 비행 되시길 바랍니다!"</h2>
      <Layout>
        <Sider width={200} style={{ background: "white" }}>
          <Menu
            mode="vertical"
            defaultSelectedKeys={["1"]}
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
            <Title
              level={5}
              style={{
                fontWeight: "bold",
                marginBottom: "16px",
                fontSize: "20px",
              }}
            >
              항공권 구매정보
            </Title>
            <Table
              columns={purchaseColumns}
              dataSource={purchaseData}
              pagination={false}
              bordered
              style={{
                marginBottom: "30px",
                backgroundColor: "white",
              }}
              components={{
                header: {
                  cell: ({ children, ...restProps }) => (
                    <th
                      {...restProps}
                      style={{
                        backgroundColor: "#007BFF",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {children}
                    </th>
                  ),
                },
              }}
            />
            <Title
              level={5}
              style={{
                fontWeight: "bold",
                marginBottom: "16px",
                fontSize: "20px",
              }}
            >
              여정
            </Title>
            <Table
              columns={scheduleColumns}
              dataSource={scheduleData}
              pagination={false}
              bordered
              style={{
                marginBottom: "30px",
                backgroundColor: "white",
              }}
              components={{
                header: {
                  cell: ({ children, ...restProps }) => (
                    <th
                      {...restProps}
                      style={{
                        backgroundColor: "#007BFF",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {children}
                    </th>
                  ),
                },
              }}
            />
            <Title
              level={5}
              style={{
                fontWeight: "bold",
                marginBottom: "16px",
                fontSize: "20px",
              }}
            >
              탑승객 정보
            </Title>
            <Table
              columns={passengerColumns}
              dataSource={passengerData}
              pagination={false}
              bordered
              style={{
                backgroundColor: "white",
              }}
              components={{
                header: {
                  cell: ({ children, ...restProps }) => (
                    <th
                      {...restProps}
                      style={{
                        backgroundColor: "#007BFF",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {children}
                    </th>
                  ),
                },
              }}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default FlightDetail;
