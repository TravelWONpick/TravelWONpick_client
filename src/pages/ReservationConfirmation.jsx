import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Typography, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FlightCard from "../components/FlightCard";
import PassengerForm from "../components/PassengerForm";
import axios from "axios";

import {
  addPassenger,
  updatePassenger,
  setFlightSelection,
} from "../store/flightSlice";

const { Text, Title } = Typography;

const { Option } = Select;

const baseUrl = "http://localhost:8080"; // 백엔드 서버 URL

const ReservationConfirmation = () => {
  const dispatch = useDispatch();
  const { selectedOutbound, selectedReturn, adultCount, tripType, totalPrice } =
    useSelector((state) => state.flight.flightInfo);
  const { passengers } = useSelector((state) => state.flight.passengerInfo);

  const [showGoingFlightDetails, setShowGoingFlightDetails] = useState(false);
  const [showReturningFlightDetails, setShowReturningFlightDetails] = useState(false);

  const [bookerInfo, setBookerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passengersList, setPassengersList] = useState([]);

  const navigate = useNavigate();

  // 전화번호를 000-0000-0000 형태로 변환하는 함수
  const formatPhoneNumber = (phoneNumber) => {
    const digits = phoneNumber.replace(/[^0-9]/g, "");
    if (digits.length > 3 && digits.length <= 7) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else if (digits.length > 7) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    }
    return digits;
  };

  // 사용자 정보 불러오기 (세션스토리지에서 액세스 토큰 사용)
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (accessToken) {
          const response = await axios.get(`${baseUrl}/my/info`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const data = response.data.data;
          
          setBookerInfo({
            name: data.name,
            email: data.email,
            phone: formatPhoneNumber(data.phoneNumber),
          });
        }
      } catch (error) {
        console.error("사용자 정보를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchUserInfo();
  }, []);

  // API로부터 탑승객 데이터 가져오기
  const fetchPassengers = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("액세스 토큰이 없습니다.");
      }

      const response = await axios.get(`${baseUrl}/my/passenger`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      // API 응답의 데이터 저장
      setPassengersList(response.data.data);
    } catch (error) {
      console.error("탑승객 목록을 불러오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchPassengers();
  }, []);

  const handlePassengerSelect = (index, passengerIndex) => {
    const selectedPassenger = passengersList[passengerIndex];
    if (selectedPassenger) {
      // 선택된 탑승객의 정보를 승객 폼에 자동으로 업데이트
      dispatch(
        updatePassenger({
          index, // 해당 승객 폼에 업데이트
          data: {
            lastName: selectedPassenger.lastName,
            firstName: selectedPassenger.firstName,
            birthDate: selectedPassenger.birth,
            gender: selectedPassenger.gender,
            phone: selectedPassenger.phoneNumber,
          },
        })
      );
    }
  };

  // 페이지 넘어가면 맨 위로 스크롤 되는 useEffect
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // 선택된 인원 수만큼 빈 승객 폼 초기화
    const initializePassengers = () => {
      const currentPassengerCount = passengers.length;
      if (currentPassengerCount < adultCount) {
        for (let i = currentPassengerCount; i < adultCount; i++) {
          dispatch(
            addPassenger({
              lastName: "",
              firstName: "",
              birthDate: "",
              gender: "",
              phone: "",
            })
          );
        }
      }
    };

    initializePassengers();
  }, []);

  const handleToggleGoingFlight = () => {
    setShowGoingFlightDetails((prev) => !prev);
  };

  const handleToggleReturningFlight = () => {
    setShowReturningFlightDetails((prev) => !prev);
  };

  const handlePassengerFormChange = (index, formData) => {
    dispatch(
      updatePassenger({
        index,
        data: formData,
      })
    );
  };

  const handlePayment = () => {
    // 필수 정보 검증
    if (!bookerInfo.name || !bookerInfo.email || !bookerInfo.phone) {
      alert("예약자 정보를 모두 입력해주세요.");
      return;
    }

    // 승객 정보 검증
    const isAllPassengersInfoComplete = passengers.every(
      (passenger) =>
        passenger.lastName &&
        passenger.firstName &&
        passenger.gender &&
        passenger.birthDate &&
        passenger.phone
    );

    if (!isAllPassengersInfoComplete) {
      alert("모든 탑승객의 정보를 입력해주세요.");
      return;
    }

    dispatch(
      setFlightSelection({
        selectedOutbound,
        selectedReturn,
        adultCount,
        tripType,
        passengers,
      })
    );

    navigate("/pricePick/payment");
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[950px] mx-auto p-5 pt-8 min-h-[80vh] bg-white">
        <Row gutter={[24, 24]}>
          <Col span={16}>
            <Card>
              <div className="p-5">
                <Title level={3} className="mb-5">
                  예약편 확인
                </Title>

                {selectedOutbound && (
                  <FlightCard
                    flightData={{
                      ...selectedOutbound,
                      departurePlace: selectedOutbound.departurePlace || "출발지",
                      arrivalPlace: selectedOutbound.arrivalPlace || "도착지",
                    }}
                    isVisible={showGoingFlightDetails}
                    onToggle={handleToggleGoingFlight}
                  />
                )}

                {tripType === "round" && selectedReturn && (
                  <FlightCard
                    flightData={{
                      ...selectedReturn,
                      departurePlace: selectedReturn.departurePlace || "출발지",
                      arrivalPlace: selectedReturn.arrivalPlace || "도착지",
                    }}
                    isVisible={showReturningFlightDetails}
                    onToggle={handleToggleReturningFlight}
                  />
                )}
              </div>
            </Card>

            {/* 예약자 정보*/}
            <Card className="mt-6 border border-solid border-[#e3e3e3] rounded-lg">
              <div className="p-5">
                <Title level={3} className="mb-5 font-bold text-[#333]">
                  예약자 정보
                </Title>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text type="secondary" className="text-[#888]">
                      이름
                    </Text>
                    <div className="font-medium">{bookerInfo.name}</div>
                  </div>
                  <div>
                    <Text type="secondary" className="text-[#888]">
                      이메일
                    </Text>
                    <div className="font-medium">{bookerInfo.email}</div>
                  </div>
                  <div>
                    <Text type="secondary" className="text-[#888]">
                      연락처
                    </Text>
                    <div className="font-medium">{bookerInfo.phone}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 탑승객 정보 입력 폼들 */}
            {passengers.slice(0, adultCount).map((passenger, index) => (
              <PassengerForm
                key={index}
                passengerNumber={index + 1}
                passengerData={passenger}
                passengersList={passengersList}
                handlePassengerSelect={handlePassengerSelect}
                onFormChange={(formData) => handlePassengerFormChange(index, formData)}
                isDeleteVisible={false}
              />
            ))}
          </Col>

          <Col span={8} style={{ position: "sticky", top: 20 }}>
            <Card>
              <div className="p-5">
                <Title level={3} className="mb-5">
                  총 요금
                </Title>
                <p>성인 {adultCount}명</p>
                <p className="text-2xl font-bold">
                  {totalPrice.toLocaleString()}원
                </p>
                <Text className="text-xs text-gray-500 block mb-4">
                  {(totalPrice / adultCount).toLocaleString()}원 x {adultCount}명
                </Text>
                <Button
                  type="primary"
                  className="w-full mt-5"
                  onClick={handlePayment}
                >
                  결제하러 가기
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ReservationConfirmation;
