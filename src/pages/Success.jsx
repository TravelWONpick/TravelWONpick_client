import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout, Typography } from "antd";
import successImage from "../assets/success.gif";
import axios from "axios";


const { Content } = Layout;
const { Title } = Typography;

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

export function Success() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { selectedOutbound, selectedReturn } = useSelector((state) => state.flight.flightInfo);
    const passengers = useSelector((state) => state.flight.passengerInfo.passengers);
   // 필요한 flightId와 seatCount 추출
    const outboundFlightId = selectedOutbound ? selectedOutbound.flightId : null;
    const returnFlightId = selectedReturn ? selectedReturn.flightId : null;
    const seatCount = passengers.length; // seatCount는 승객 수로 계산
    console.log(selectedOutbound, selectedReturn, passengers);
    

    useEffect(() => {
        async function validateAndConfirmPayment() {
            const paymentData = {
                orderId: searchParams.get("orderId"),
                amount: Number(searchParams.get("amount")),
                paymentKey: searchParams.get("paymentKey"),
            };
            console.log(paymentData);

            try {
                // 1. 결제 정보 검증 요청
                const validateResponse = await api.post(
                    "/payments/validate",
                    {
                        orderId: paymentData.orderId,
                        amount: paymentData.amount,
                    }
                );

                const validateRequestData = validateResponse.data.data; // BaseResponse의 data 필드에서 데이터 추출
        
                if (!validateRequestData.valid) {
                    navigate(`/fail?message=validation_failed`);
                    return;
                }

                
                // 2. 결제 승인 요청
                const confirmResponse = await api.post("/payments/confirm", {
                    orderId: paymentData.orderId,
                    amount: paymentData.amount,
                    paymentKey: paymentData.paymentKey,
                    depFlightId: outboundFlightId,
                    arrFlightId: returnFlightId,
                    seatCount: seatCount,
                    passengers: passengers
                });
                console.log(confirmResponse.data);
            
            } catch (error) {
                if (error.response) {
                    // 서버 응답이 있는 경우
                    const { message, code } = error.response.data;
                    if (error.response.config.url.includes("validate")) {
                        navigate(
                            `/fail?message=validation_failed&code=${code}`
                        );
                    } else {
                        console.log(error.response.data);
                        navigate(`/fail?message=${message}&code=${code}`);
                    }
                } else if (error.request) {
                    // 요청이 서버에 도달했지만, 응답을 받지 못한 경우 (네트워크 문제 가능성)
                    console.error(
                        "Network error or no response received:",
                        error.message
                    );
                    navigate("/fail?message=network_error");
                } else {
                    // 요청 설정 중 발생한 에러
                    console.error("Request setup error:", error.message);
                    navigate("/fail?message=system_error");
                }
            }
        }

        validateAndConfirmPayment();
    }, []);

    return (
        <Layout
            style={{
                minHeight: "80vh",
                background: "white",
                width: "100%",
                maxWidth: "950px",
                margin: "0 auto",
                paddingLeft: "20px",
                paddingRight: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Content style={{ textAlign: "center", padding: "40px 0" }}>
                <img
                    src={successImage}
                    alt="결제 성공"
                    style={{
                        width: "300px",
                        height: "300px",
                        margin: "0 auto",
                    }}
                />
                <Title level={3} style={{ marginTop: "20px" }}>
                    결제를 완료했어요
                </Title>
                <p>{`주문번호: ${searchParams.get("orderId")}`}</p>
                <p>{`결제 금액: ${Number(
                    searchParams.get("amount")
                ).toLocaleString()}원`}</p>
                {/* <p>{`Payment Key: ${searchParams.get("paymentKey")}`}</p> */}
            </Content>
        </Layout>
    );
}

export default Success;
