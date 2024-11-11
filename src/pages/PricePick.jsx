// import React, { useState } from "react";
// import { Card, Button, Row, Col, Tag, Input } from "antd";
// import "./Tabs.css"; // CSS 파일을 통해 스타일링 적용

// const { Search } = Input;

// const PricePick = () => {
//   const [selectedCategory, setSelectedCategory] = useState("전체");
//   const [searchKeyword, setSearchKeyword] = useState("");

//   // 여행 데이터 목록
//   // TODO: 출발지 데이터 동적으로 추가하기
//   const travelData = [
//     {
//       id: 1,
//       title: "호이안 12월 비행기 특가",
//       description:
//         "다낭 홈쇼핑을 놓친 분들을 위한 상품입니다. 월드체인 5성급 호텔 숙박과 다낭 여행에서 꼭 방문해야 할 명소와 다양한 특식이 포함되어 있습니다.",
//       category: "동남아",
//       price: "389,000원 ~",
//       imageUrl:
//         "https://github.com/user-attachments/assets/8f4fe28a-38a5-4e3a-99b4-9659b15016bb",
//       departure: "11월 출발",
//       status: "진행 예정",
//       timeLeft: "01:10:23 남음",
//     },
//     {
//       id: 2,
//       title: "도쿄(NRT)",
//       description: "도쿄에서 즐기는 도시의 활기와 멋진 풍경을 경험해 보세요.",
//       category: "일본",
//       price: "362,700원 ~",
//       imageUrl:
//         "https://github.com/user-attachments/assets/6c168935-1594-4b5c-8ccb-26d4b083d908",
//       departure: "12월 출발",
//       status: "진행 중",
//       timeLeft: "예매하기",
//     },
//     {
//       id: 3,
//       title: "로스엔젤레스(LAX)",
//       description: "로스엔젤레스에서 즐기는 여름 바다와 다양한 체험!",
//       category: "유럽&미주",
//       price: "901,400원 ~",
//       imageUrl:
//         "https://github.com/user-attachments/assets/859707be-dc54-475f-a007-8e9317a6a5b3",
//       departure: "7월 출발",
//       status: "진행 예정",
//       timeLeft: "02:15:40 남음",
//     },
//     {
//       id: 4,
//       title: "파리(CDG)",
//       description: "파리에서의 낭만적인 여름을 느껴보세요.",
//       category: "유럽&미주",
//       price: "572,500원 ~",
//       imageUrl:
//         "https://github.com/user-attachments/assets/70f80962-1151-4b40-9fba-903c743bc158",
//       departure: "8월 출발",
//       status: "진행 중",
//       timeLeft: "예매하기",
//     },
//     // 추가된 데이터들...
//   ];

//   // 선택된 카테고리와 검색어에 맞는 여행 데이터 필터링
//   const filteredData = travelData.filter((item) => {
//     const isCategoryMatch =
//       selectedCategory === "전체" || item.category === selectedCategory;
//     const isSearchMatch = item.title
//       .toLowerCase()
//       .includes(searchKeyword.toLowerCase());
//     return isCategoryMatch && isSearchMatch;
//   });

//   // 카드 컴포넌트 목록 생성
//   const CardComponent = ({ data }) => (
//     <>
//       {data.map((item) => (
//         <Card
//           key={item.id}
//           style={{
//             marginBottom: "16px",
//             borderRadius: "8px",
//             boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <Row align="middle">
//             {/* 왼쪽: 이미지 */}
//             <Col span={6}>
//               <img
//                 src={item.imageUrl}
//                 alt={item.title}
//                 style={{ width: "100%", height: "auto", borderRadius: "8px" }}
//               />
//             </Col>

//             {/* 중간: 여행 설명 */}
//             <Col span={12} style={{ padding: "0 16px" }}>
//               <Tag color={item.status === "진행 중" ? "blue" : "purple"}>
//                 {item.status}
//               </Tag>
//               <h3 style={{ marginTop: "8px" }}>{item.title}</h3>
//               <p>{item.description}</p>
//               <div style={{ marginTop: "8px", color: "#555" }}>
//                 <p>📍 다낭, 호이안</p>
//                 <p>🗓 {item.departure}</p>
//               </div>
//             </Col>

//             {/* 오른쪽: 가격 및 버튼 */}
//             <Col
//               span={6}
//               style={{
//                 textAlign: "right",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//                 alignItems: "flex-end", // 버튼을 오른쪽에 정렬
//                 height: "100%",
//               }}
//             >
//               <div>
//                 <h3 style={{ color: "#111111" }}>{item.price}</h3>
//               </div>
//               {item.status === "진행 예정" ? (
//                 <div style={{ textAlign: "right" }}>
//                   <p
//                     style={{
//                       marginBottom: "8px",
//                       fontSize: "14px",
//                       color: "#888",
//                     }}
//                   >
//                     10/30 00시 오픈
//                   </p>
//                   <Button
//                     type="default"
//                     style={{
//                       borderColor: "#5E2BB8",
//                       color: "#5E2BB8",
//                       height: "40px",
//                       width: "100px", // 버튼 크기 조정
//                     }}
//                   >
//                     {item.timeLeft}
//                   </Button>
//                 </div>
//               ) : (
//                 <Button
//                   type="default"
//                   style={{
//                     borderColor: "#5E2BB8",
//                     color: "#5E2BB8",
//                     height: "40px",
//                     width: "100px", // 버튼 크기 조정
//                   }}
//                 >
//                   {item.timeLeft}
//                 </Button>
//               )}
//             </Col>
//           </Row>
//         </Card>
//       ))}
//     </>
//   );

//   // 탭 목록
//   const tabItems = ["전체", "국내", "일본", "동남아", "유럽&미주"];

//   // 검색 핸들러
//   const handleSearch = (value) => {
//     setSearchKeyword(value);
//   };

//   return (
//     <div
//       className="tabs-container"
//       style={{ maxWidth: "950px", margin: "0 auto" }}
//     >
//       {/* 페이지 제목 */}
//       <div style={{ marginBottom: "20px" }}>
//         <h2 style={{ fontWeight: "bold", fontSize: "24px" }}>특가 PICK</h2>
//       </div>

//       {/* 탭 버튼 및 검색 창 */}
//       <div className="tab-buttons" style={{ display: "flex", gap: "16px" }}>
//         <div style={{ flexGrow: 1 }}>
//           {tabItems.map((tab) => (
//             <button
//               key={tab}
//               className={selectedCategory === tab ? "active" : ""}
//               onClick={() => setSelectedCategory(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//         <div style={{ flexGrow: 0 }}>
//           <Search
//             placeholder="목록 검색"
//             onSearch={handleSearch}
//             // enterButton="Search"
//             size="middle"
//             allowClear
//             style={{
//               width: "300px",
//               borderRadius: "8px", // 검색창 전체를 둥글게 만듦
//               border: "1px solid #ddd",
//             }}
//             enterButton={
//               <Button
//                 type="primary"
//                 style={{
//                   backgroundColor: "#007bff",
//                   borderColor: "#007bff",
//                   borderRadius: "0 8px 8px 0", // 오른쪽 끝을 둥글게 만듦
//                 }}
//               >
//                 Search
//               </Button>
//             }
//           />
//         </div>
//       </div>

//       {/* 탭 콘텐츠 */}
//       <div className="tab-content">
//         <CardComponent data={filteredData} />
//       </div>
//     </div>
//   );
// };

// export default PricePick;
import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Tag, Input } from "antd";
import "./Tabs.css";

const { Search } = Input;

const PricePick = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateTimeLeft = (openTime) => {
    const targetDate = new Date(openTime);
    const difference = targetDate - currentTime;

    if (difference <= 0) {
      return null;
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  // 가격을 포맷팅하는 함수 추가
  const formatPrice = (price) => {
    return `${price.toLocaleString()}원 ~`;
  };

  const travelData = [
    {
      id: 1,
      title: "호이안 12월 비행기 특가",
      description:
        "다낭 홈쇼핑을 놓친 분들을 위한 상품입니다. 월드체인 5성급 호텔 숙박과 다낭 여행에서 꼭 방문해야 할 명소와 다양한 특식이 포함되어 있습니다.",
      category: "동남아",
      price: 389000,
      imageUrl:
        "https://github.com/user-attachments/assets/8f4fe28a-38a5-4e3a-99b4-9659b15016bb",
      departure: "11월 출발",
      destination: "다낭, 호이안",
      openTime: "2024-11-12 18:10:00",
    },
    {
      id: 2,
      title: "도쿄(NRT)",
      description: "도쿄에서 즐기는 도시의 활기와 멋진 풍경을 경험해 보세요.",
      category: "일본",
      price: 362700,
      imageUrl:
        "https://github.com/user-attachments/assets/6c168935-1594-4b5c-8ccb-26d4b083d908",
      departure: "12월 출발",
      destination: "도쿄",
      openTime: "2024-11-08 00:00:00", // 이미 오픈된 상태이므로 과거 시간으로 설정
    },
    {
      id: 3,
      title: "로스엔젤레스(LAX)",
      description: "로스엔젤레스에서 즐기는 여름 바다와 다양한 체험!",
      category: "유럽&미주",
      price: 901400,
      imageUrl:
        "https://github.com/user-attachments/assets/859707be-dc54-475f-a007-8e9317a6a5b3",
      departure: "7월 출발",
      destination: "로스엔젤레스",
      openTime: "2024-11-08 12:02:00",
    },
    {
      id: 4,
      title: "파리(CDG)",
      description: "파리에서의 낭만적인 여름을 느껴보세요.",
      category: "유럽&미주",
      price: 572500,
      imageUrl:
        "https://github.com/user-attachments/assets/70f80962-1151-4b40-9fba-903c743bc158",
      departure: "8월 출발",
      destination: "파리",
      openTime: "2024-11-08 00:00:00", // 이미 오픈된 상태이므로 과거 시간으로 설정
    },
    // ... 다른 여행 데이터
  ];

  const filteredData = travelData.filter((item) => {
    const isCategoryMatch =
      selectedCategory === "전체" || item.category === selectedCategory;
    const isSearchMatch = item.title
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    return isCategoryMatch && isSearchMatch;
  });

  const CardComponent = ({ data }) => (
    <>
      {data.map((item) => {
        const timeLeft = item.openTime
          ? calculateTimeLeft(item.openTime)
          : null;
        const isOpen = item.openTime && !timeLeft;

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
                  src={item.imageUrl}
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
                  <p>🗓 {item.departure}</p>
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
                  <h3 style={{ color: "#111111" }}>
                    {formatPrice(item.price)}
                  </h3>
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
                  >
                    예매하기
                  </Button>
                )}
              </Col>
            </Row>
          </Card>
        );
      })}
    </>
  );

  const tabItems = ["전체", "국내", "일본", "동남아", "유럽&미주"];

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
        <CardComponent data={filteredData} />
      </div>
    </div>
  );
};

export default PricePick;
