import React from "react";
import { Layout, Menu, Typography, Table } from "antd";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;

const Flight = () => {
  const columns = [
    {
      title: "예약 번호",
      dataIndex: "reservationNumber",
      key: "reservationNumber",
      align: "center",
      render: (text) => (
        <Link
          to="/my/flight-detail"
          style={{ color: "#0039FF", textDecoration: "underline" }}
        >
          {text}
        </Link>
      ), 
    },
    {
      title: "탑승일",
      dataIndex: "boardingDate",
      key: "boardingDate",
      align: "center",
    },
    {
      title: "여정",
      dataIndex: "route",
      key: "route",
      align: "center",
    },
    {
      title: "좌석",
      dataIndex: "seat",
      key: "seat",
      align: "center",
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
  ];

  const data = [
    {
      key: "1",
      reservationNumber: "A3C45C",
      boardingDate: "2024.6.15(수) 21:50",
      route: "서울/인천(ICN) → 나리타(NRT)",
      seat: "3",
      status: "왕복",
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
          <h2 className="text-2xl font-bold pb-5">
              {localStorage.getItem("userName")
                  ? `${localStorage.getItem("userName")}님, 즐거운 비행 되시길 바랍니다!`
                  : "OOO님, 즐거운 비행 되시길 바랍니다!"}
          </h2>
          <Layout>
              <Sider width={200} style={{background: "white"}}>
                  <Menu
                      mode="vertical"
                      defaultSelectedKeys={["1"]}
                      style={{borderRight: 0}}
                  >
                      <ItemGroup
                          key="g1"
                          title={
                              <Text strong style={{fontSize: "18px", fontWeight: "bold"}}>
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
                              <Text strong style={{fontSize: "18px", fontWeight: "bold"}}>
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
              <Layout style={{background: "white"}}>
                  <Content style={{padding: "24px", paddingTop: "8px"}}>
                      <Title
                          level={5}
                          style={{
                              fontWeight: "bold",
                              marginBottom: "16px",
                              fontSize: "20px",
                          }}
                      >
                          항공
                      </Title>
                      <Table
                          columns={columns}
                          dataSource={data}
                          pagination={false}
                          bordered
                          style={{
                              backgroundColor: "white",
                          }}
                          components={{
                              header: {
                                  cell: ({children, ...restProps}) => (
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

export default Flight;
