import React, { useEffect, useState } from "react";
import { Layout, Menu, Typography, Table, Spin, message } from "antd";
import { Link, useParams } from "react-router-dom";
import api from '../components/axios';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;

const FlightDetail = () => {
    const { reservationId } = useParams();
    const [loading, setLoading] = useState(true);
    const [purchaseData, setPurchaseData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [passengerData, setPassengerData] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            const token = sessionStorage.getItem("accessToken");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const [flightResponse, passengerResponse] = await Promise.all([
                    api.get(`/my/flight/${reservationId}/flight-detail`, { headers }),
                    api.get(`/my/flight/${reservationId}/passenger-detail`, { headers }),
                ]);

                if (flightResponse.data?.status === 200) {
                    const flightData = flightResponse.data.data;
                    setPurchaseData([
                        {
                            key: "1",
                            name: sessionStorage.getItem("userName") || "사용자",
                            seats: flightData.seatCount,
                            ticketPrice: flightData.originPrice.toLocaleString(),
                            discount: flightData.discount.toLocaleString(),
                            totalPrice: flightData.amount.toLocaleString(),
                        },
                    ]);

                    setScheduleData([
                        {
                            key: "1",
                            flightNumber: flightData.outFlightNumber,
                            route: flightData.outJourney,
                            departure: flightData.outDepartureTime,
                            arrival: flightData.outArrivalTime,
                            seat: `${flightData.seatCount}석`,
                        },
                        {
                            key: "2",
                            flightNumber: flightData.inFlightNumber,
                            route: flightData.inJourney,
                            departure: flightData.inDepartureTime,
                            arrival: flightData.inArrivalTime,
                            seat: `${flightData.seatCount}석`,
                        },
                    ]);
                }

                if (passengerResponse.data?.status === 200) {
                    setPassengerData(
                        passengerResponse.data.data.map((passenger, index) => ({
                            key: index + 1,
                            passengerName: `${passenger.lastName} / ${passenger.firstName}`,
                            gender: passenger.gender === "FEMALE" ? "여성" : "남성",
                            birthDate: passenger.birth,
                            phoneNumber: passenger.phoneNumber,
                        }))
                    );
                }
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
                message.error("데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [reservationId]);

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

    if (loading) {
        return (
            <Layout style={{ minHeight: "80vh", justifyContent: "center", alignItems: "center" }}>
                <Spin tip="로딩 중..." size="large" />
            </Layout>
        );
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
                                  to="/my/flights"
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
                                  to="/my/passengers"
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
                                  to="/my/infomation"
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

export default FlightDetail;
