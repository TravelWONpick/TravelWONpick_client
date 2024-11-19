import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Tag, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "./Tabs.css";

const { Search } = Input;
const baseUrl = "http://localhost:8080"; // 백엔드 서버 URL

const PricePick = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [travelData, setTravelData] = useState([]);
  const navigate = useNavigate();

  // API를 통해 데이터를 가져오는 함수
  const fetchTravelData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/special`);
      const data = response.data.data.specialPrices;
      setTravelData(data);
    } catch (error) {
      console.error("Failed to fetch special prices:", error);
    }
  };

  useEffect(() => {
    fetchTravelData();
  }, []);

  const formatPrice = (price) => {
    return `${price.toLocaleString()}원 ~`;
  };

  const filteredData = useMemo(() => {
    return travelData.filter((item) => {
      const isCategoryMatch =
        selectedCategory === "전체" || item.category === selectedCategory;
      const isSearchMatch = item.title
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
      return isCategoryMatch && isSearchMatch;
    });
  }, [travelData, selectedCategory, searchKeyword]);

  const SingleCard = ({ item }) => {
    console.log("Item data:", item);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(item.openTime));
    const isOpen = timeLeft === null;

    useEffect(() => {
      if (isOpen) return;
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(item.openTime));
      }, 1000);
      return () => clearInterval(timer);
    }, [item.openTime, isOpen]);

    function calculateTimeLeft(openTime) {
      const targetDate = new Date(openTime);
      const difference = targetDate - new Date();

      if (difference <= 0) return null;

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    }

    const handleReservationClick = () => {
      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        Modal.warning({
          title: "로그인이 필요합니다",
          content: "예매하기를 이용하려면 먼저 로그인을 해주세요.",
          centered: true,
          onOk() {
            navigate("/login");
          },
        });
      } else {
        navigate(`/pricePick/reservation`, {
          state: {
            sp_id: item.id,
            arrival_airport_code: item.arrival_airport_code,
            departure_airport_code: item.departure_airport_code,
          },
        });
      }
    };


    return (
      <Card
        key={item.id}
        style={{
          marginBottom: "16px",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row align="middle">
          <Col span={6}>
            <img
              src={item.image_url}
              alt={item.title}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Col>

          <Col span={12} style={{ padding: "0 16px" }}>
            <Tag color={isOpen ? "blue" : "purple"}>
              {isOpen ? "진행 중" : "진행 예정"}
            </Tag>
            <h3 style={{ marginTop: "8px" }}>{item.title}</h3>
            <p>{item.description}</p>
            <div style={{ marginTop: "8px", color: "#555" }}>
              <p>📍 {item.destination}</p>
              <p>🗓 {item.departureDate}</p>
            </div>
          </Col>

          <Col
            span={6}
            style={{
              textAlign: "right",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-end",
              height: "100%",
            }}
          >
            <div>
              <h3 style={{ color: "#111111" }}>{formatPrice(item.minPrice)}</h3>
            </div>
            {!isOpen ? (
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    marginBottom: "8px",
                    fontSize: "14px",
                    color: "#888",
                  }}
                >
                  {new Date(item.openTime).toLocaleString("ko-KR", {
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}{" "}
                  오픈
                </p>
                <Button
                  type="default"
                  style={{
                    borderColor: "#5E2BB8",
                    color: "#5E2BB8",
                    height: "40px",
                    width: "100px",
                  }}
                >
                  {timeLeft}
                </Button>
              </div>
            ) : (
              <Button
                type="default"
                style={{
                  borderColor: "#5E2BB8",
                  color: "#5E2BB8",
                  height: "40px",
                  width: "100px",
                }}
                onClick={handleReservationClick}
              >
                예매하기
              </Button>
            )}
          </Col>
        </Row>
      </Card>
    );
  };

  const tabItems = ["전체", "국내", "일본", "동남아", "유럽"];

  const handleSearch = (value) => {
    setSearchKeyword(value);
  };

  return (
    <div
      className="tabs-container"
      style={{ maxWidth: "950px", margin: "0 auto", paddingTop: "30px" }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontWeight: "bold", fontSize: "24px" }}>특가 PICK</h2>
      </div>

      <div className="tab-buttons" style={{ display: "flex", gap: "16px" }}>
        <div style={{ flexGrow: 1 }}>
          {tabItems.map((tab) => (
            <button
              key={tab}
              className={selectedCategory === tab ? "active" : ""}
              onClick={() => setSelectedCategory(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div style={{ flexGrow: 0 }}>
          <Search
            placeholder="목록 검색"
            onSearch={handleSearch}
            size="middle"
            allowClear
            style={{
              width: "300px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
            enterButton={
              <Button
                type="primary"
                style={{
                  backgroundColor: "#007bff",
                  borderColor: "#007bff",
                  borderRadius: "0 8px 8px 0",
                }}
              >
                Search
              </Button>
            }
          />
        </div>
      </div>

      <div className="tab-content">
        {filteredData.map((item) => (
          <SingleCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PricePick;
