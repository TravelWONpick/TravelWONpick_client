import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import axios from "axios";

import "./Checkout.css";


const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
// customer 별 uuid 생성
const customerKey = uuidv4();

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

export function Checkout() {

    const location = useLocation();
    const { totalPrice, passengerCount } = location.state || {};

    const [amount, setAmount] = useState({
        currency: "KRW",
        value: totalPrice,
    });
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);

    useEffect(() => {
        async function fetchPaymentWidgets() {
            // ------  결제위젯 초기화 ------
            const tossPayments = await loadTossPayments(clientKey);
            // 회원 결제
            const widgets = tossPayments.widgets({
                customerKey,
            });
            setWidgets(widgets);
        }

        fetchPaymentWidgets();
    }, [clientKey, customerKey]);

    useEffect(() => {
        async function renderPaymentWidgets() {
            if (widgets == null) {
                return;
            }
            // ------ 주문의 결제 금액 설정 ------
            await widgets.setAmount(amount);

            await Promise.all([
                // ------  결제 UI 렌더링 ------
                widgets.renderPaymentMethods({
                    selector: "#payment-method",
                    variantKey: "DEFAULT",
                }),
                // ------  이용약관 UI 렌더링 ------
                widgets.renderAgreement({
                    selector: "#agreement",
                    variantKey: "AGREEMENT",
                }),
            ]);

            setReady(true);
        }

        renderPaymentWidgets();
    }, [widgets]);

    useEffect(() => {
        if (widgets == null) {
            return;
        }

        widgets.setAmount(amount);
    }, [widgets, amount]);

    return (
        <div className="wrapper">
            <div className="box_section">
                {/* 결제 UI */}
                <div id="payment-method" />
                {/* 이용약관 UI */}
                <div id="agreement" />
                {/* 결제하기 버튼 */}
                <div className="button-container">
                    <button
                        className="button"
                        disabled={!ready}
                        onClick={async () => {
                            try {
                                // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                                // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                                // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                                const orderId = uuidv4();

                                const token = sessionStorage.getItem("accessToken");
                                
                                const postOrderRequest = {
                                    orderId: orderId,
                                    amount: amount.value,
                                };
                                console.log(
                                    "Sending order request:",
                                    postOrderRequest
                                );

                                api.post("/order/create", postOrderRequest, {
                                    headers: {
                                        Authorization: `Bearer ${token}`, // Authorization 헤더 추가
                                    },
                                })
                                    .then((response) => {
                                        console.log(
                                            "Order Created:",
                                            response.data
                                        );
                                    })
                                    .catch((error) => {
                                        console.error(
                                            "Error creating order:",
                                            error
                                        );
                                    });

                                await widgets.requestPayment({
                                    orderId: orderId,
                                    orderName: `트레블WON픽 항공권 ${passengerCount}매`,
                                    successUrl:
                                        window.location.origin + "/success",
                                    failUrl: window.location.origin + "/fail",
                                });
                            } catch (error) {
                                // 에러 처리하기
                                console.error(error);
                            }
                        }}
                    >
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Checkout;
