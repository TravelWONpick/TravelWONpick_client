import React, { useState, useEffect } from "react";
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
    message,
} from "antd";
import { useNavigate, Link } from "react-router-dom";
import api from '../components/axios';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;

const InfoUpdate = () => {
    const [form, setForm] = useState({
        email: "",
        name: "",
        phoneNumber: "",
        notification: false, // 기본값 설정
    });

    const navigate = useNavigate();

    // 기존 회원정보 불러오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get('/my/info', {
                    headers: { 
                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` 
                    }
                });
                const { email, name, phoneNumber, notification } = response.data.data;
                // 하이픈 포함된 전화번호 처리
                let phoneValue = phoneNumber.replace(/[^0-9]/g, "");
                if (phoneValue.length > 3 && phoneValue.length <= 7) {
                    phoneValue = `${phoneValue.slice(0, 3)}-${phoneValue.slice(3)}`;
                } else if (phoneValue.length > 7) {
                    phoneValue = `${phoneValue.slice(0, 3)}-${phoneValue.slice(
                        3,
                        7
                    )}-${phoneValue.slice(7)}`;
                }

                setForm({ email, name, phoneNumber: phoneValue, notification });
            } catch (error) {
                message.error("회원 정보를 불러오는 데 실패했습니다.");
                console.error(error);
            }
        };

        fetchUserInfo();
    }, []);

    // 입력 필드 변경 처리
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phoneNumber") {
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

    const handleNotificationChange = (e) => {
        setForm({ ...form, notification: e.target.value === "enabled" });
    };

    // 수정 저장 처리
    const handleSave = async () => {
        try {
            const response = await api.patch(
                '/my/info',
                {
                    email: form.email,
                    name: form.name,
                    phoneNumber: form.phoneNumber.replace(/-/g, ""), // 하이픈 제거
                    notification: form.notification,
                },
                {
                    headers: { 
                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` 
                    }
                }
            );

            if (response.status === 200) {
                message.success("회원정보가 성공적으로 수정되었습니다.");

                // 로컬스토리지에 userName 업데이트
                sessionStorage.setItem("userName", form.name);

                navigate("/my/infomation");
            } else {
                message.error("회원정보 수정에 실패했습니다.");
            }
        } catch (error) {
            message.error("회원정보 수정 중 오류가 발생했습니다.");
            console.error(error);
        }
    };

    const handleCancel = () => {
        navigate("/my/infomation");
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
                {sessionStorage.getItem("userName")
                    ? `${sessionStorage.getItem("userName")}님, 즐거운 비행 되시길 바랍니다!`
                    : "OOO님, 즐거운 비행 되시길 바랍니다!"}
            </h2>
            <Layout>
                <Sider width={200} style={{background: "white"}}>
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
                                <Text strong style={{ fontSize: "18px", fontWeight: "bold" }}>
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
                                        name="phoneNumber"
                                        value={form.phoneNumber}
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
                                        value={form.notification ? "enabled" : "disabled"}
                                        onChange={handleNotificationChange}
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
