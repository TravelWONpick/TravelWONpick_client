import React, { useEffect, useState } from "react";
import { Layout, Menu, Typography, Table, message, Spin } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;


const Flight = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    // 예약 데이터 가져오기
    const fetchReservations = async () => {
        const token = sessionStorage.getItem("accessToken");
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/my/flight`, { headers });
            if (response.data?.status === 200) {
                setReservations(response.data?.data || []);
            } else {
                message.error("예약 데이터를 불러오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
            if (error.response && error.response.status === 401) {
                message.error("인증되지 않은 사용자입니다. 다시 로그인하세요.");
            } else {
                message.error("서버와 통신 중 문제가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    // 테이블 컬럼 정의
    const columns = [
        {
            title: "예약 번호",
            dataIndex: "orderId",
            key: "orderId",
            align: "center",
            render: (text) => (
                <Link
                    to={`/my/flight-detail/${text}`}
                    style={{ color: "#007BFF", textDecoration: "underline" }}
                >
                    {text.substring(0, 6)}
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
            dataIndex: "journey",
            key: "journey",
            align: "center",
        },
        {
            title: "좌석",
            dataIndex: "seatCount",
            key: "seatCount",
            align: "center",
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
                {sessionStorage.getItem("userName")
                    ? `${sessionStorage.getItem("userName")}님, 즐거운 비행 되시길 바랍니다!`
                    : "OOO님, 즐거운 비행 되시길 바랍니다!"}
            </h2>
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
                            항공
                        </Title>
                        {loading ? (
                            <Spin tip="로딩 중..." size="large" />
                        ) : (
                            <Table
                                columns={columns}
                                dataSource={reservations.map((reservation) => ({
                                    ...reservation,
                                    key: reservation.orderId, // 유일한 값 사용
                                }))}
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
                                                    whiteSpace: "nowrap", // 텍스트 한 줄로 유지
                                                }}
                                            >
                                                {children}
                                            </th>
                                        ),
                                    },
                                }}
                            />
                        )}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Flight;
