import React, { useEffect, useState } from "react";
import {
    Layout,
    Typography,
    Button,
    Radio,
    Card,
    Row,
    Col,
    Menu,
    Modal,
    Checkbox,
    message,
} from "antd";
import { useNavigate, Link } from "react-router-dom";
import api from '../components/axios';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;

const Info = () => {
    const [form, setForm] = useState({
        email: "",
        name: "",
        phoneNumber: "",
        notification: true,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const navigate = useNavigate();

    // 전화번호를 000-0000-0000 형태로 변환하는 함수
    const formatPhoneNumber = (phoneNumber) => {
        const digits = phoneNumber.replace(/[^0-9]/g, ""); // 숫자만 남김
        if (digits.length > 3 && digits.length <= 7) {
            return `${digits.slice(0, 3)}-${digits.slice(3)}`;
        } else if (digits.length > 7) {
            return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
        }
        return digits;
    };

    // API에서 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get('/my/info', {
                    headers: { 
                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` 
                    }
                });
                const data = response.data.data;
                data.phoneNumber = formatPhoneNumber(data.phoneNumber); // 전화번호 포맷 변경
                setForm(data); // API에서 받은 데이터 설정
            } catch (error) {
                message.error("회원 정보를 불러오는 데 실패했습니다.");
                console.error(error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleUpdateInfo = () => {
        navigate("/my/info/update");
    };

    const handleCancel = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = async () => {
        try {
            const response = await api.delete('/my/account', {
                headers: { 
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` 
                }
            });
            if (response.status === 200) {
                message.success("회원 탈퇴가 완료되었습니다.");
                setIsModalVisible(false);

                // 상태 초기화
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("isAdmin");
                sessionStorage.removeItem("userName");

                // 페이지 리로드를 통해 Header 초기화
                navigate("/");
                window.location.reload(); // 헤더 상태를 초기화하기 위해 전체 새로고침
            } else {
                message.error("회원 탈퇴에 실패했습니다.");
            }
        } catch (error) {
            message.error("회원 탈퇴 중 오류가 발생했습니다.");
            console.error(error);
        }
    };


    const handleModalCancel = () => {
        setIsModalVisible(false);
        setIsCheckboxChecked(false); // Reset the checkbox state when modal is cancelled
    };

    const handleCheckboxChange = (e) => {
        setIsCheckboxChecked(e.target.checked);
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
                        나의 회원정보
                    </Title>
                    <Card
                        style={{
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #d9d9d9",
                            marginBottom: "48px",
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
                                    <div style={{ marginTop: "5px" }}>{form.email}</div>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: "16px" }} align="middle">
                                <Col span={6}>
                                    <Text style={{ fontWeight: "bold", fontSize: "14px" }}>
                                        이름
                                    </Text>
                                </Col>
                                <Col span={18}>
                                    <div style={{ marginTop: "5px" }}>{form.name}</div>
                                </Col>
                            </Row>
                            <Row align="middle">
                                <Col span={6}>
                                    <Text style={{ fontWeight: "bold", fontSize: "14px" }}>
                                        휴대폰 번호
                                    </Text>
                                </Col>
                                <Col span={18}>
                                    <div style={{ marginTop: "5px" }}>{form.phoneNumber}</div>
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
                                        value={form.notification ? "enable" : "disable"}
                                        style={{ color: "inherit" }}
                                    >
                                        <Radio
                                            value="enable"
                                            disabled={true}
                                            style={{ color: "inherit" }}
                                        >
                                            허용
                                        </Radio>
                                        <Radio
                                            value="disable"
                                            disabled={true}
                                            style={{ color: "inherit" }}
                                        >
                                            비허용
                                        </Radio>
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
                            onClick={handleUpdateInfo}
                            style={{
                                marginRight: "16px",
                                backgroundColor: "#007BFF",
                                borderColor: "#007BFF",
                                color: "white",
                            }}
                        >
                            정보 수정
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleCancel}
                            style={{ backgroundColor: "black", borderColor: "black" }}
                        >
                            회원 탈퇴
                        </Button>
                    </div>
                </Content>
            </Layout>
            <Modal
                title="회원탈퇴"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="탈퇴하기"
                cancelText="취소"
                okButtonProps={{ disabled: !isCheckboxChecked }}
            >
                <div style={{ marginBottom: "16px" }}>
                    <Text strong>유의사항</Text>
                    <div
                        style={{
                            border: "1px solid #d9d9d9",
                            borderRadius: "8px",
                            padding: "16px",
                            marginTop: "8px",
                        }}
                    >
                        <ul style={{ paddingLeft: "20px" }}>
                            <li>
                                회원탈퇴 시 회원님의 정보는 거래 관련 의무 관계의 확인 등을
                                이유로 상법, 전자상거래에서의 소비자보호에 관한 법률 등
                                관련법령의 규정 또는 회사 내부 방침에 의한 정보 보유 사유에
                                의하여 5년간 관리됩니다.
                            </li>
                            <li>진행중인 예약 내역이 있을 경우 탈퇴할 수 없습니다.</li>
                            <li>탈퇴 후 90일 동안 재가입이 불가능합니다.</li>
                            <li>재가입 시 기존 정보는 연동되지 않습니다.</li>
                        </ul>
                    </div>
                </div>
                <Checkbox checked={isCheckboxChecked} onChange={handleCheckboxChange}>
                    회원탈퇴 안내를 모두 확인하였으며 탈퇴에 동의합니다.
                </Checkbox>
            </Modal>
        </Layout>
    );
};

export default Info;
