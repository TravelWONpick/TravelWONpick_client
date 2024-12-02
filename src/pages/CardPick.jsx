import React, { useState, useEffect } from 'react';
import api from '../components/axios';
import { Tag, Button, Pagination } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import '../css/CardPick.css';
import useSessionClearOnMain from '../hooks/useSessionClearOnMain';

const CardPick = () => {
  const [cards, setCards] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedAnnualFee, setSelectedAnnualFee] = useState(null);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [toggleState, setToggleState] = useState({
    type: true,
    fee: true,
    benefits: true,
  });

  const pageSize = 3;

  // API로부터 카드 데이터를 가져오는 함수
  const fetchCards = async () => {
    try {
      const response = await api.get('/cards');

      console.log(response.data.cards);
      

      const fetchedCards = response.data.cards.map(card => ({
        title: card.title,
        description: card.description,
        annualFee: card.annualFee,
        image: card.image,
        detailsLink: card.detailLink,
        applyLink: card.applyLink,
        type: card.type,
        categories: card.categories.map(category => category.description),
        benefits: card.benefits.map(benefit => ({
          name: benefit.name,
          detail: benefit.detail,
          image: benefit.image
        }))
      }));
      setCards(fetchedCards);
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const filterCards = () => {
    return cards.filter((card) => {
      const typeMatch = selectedType ? card.type === selectedType : true;
      const feeMatch = selectedAnnualFee
          ? (selectedAnnualFee === '1만원 이하' && card.annualFee <= 10000) ||
          (selectedAnnualFee === '1만원 ~ 3만원' && card.annualFee > 10000 && card.annualFee <= 30000) ||
          (selectedAnnualFee === '3만원 ~ 5만원' && card.annualFee > 30000 && card.annualFee <= 50000) ||
          (selectedAnnualFee === '상관없음')
          : true;
      const benefitsMatch = selectedBenefits.length > 0
          ? selectedBenefits.every(benefit => card.categories.includes(benefit))
          : true;
      return typeMatch && feeMatch && benefitsMatch;
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const filteredCards = filterCards();
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleSection = (section) => {
    setToggleState((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleTypeClick = (type) => {
    setSelectedType((prevType) => (prevType === type ? null : type));
  };

  const handleFeeClick = (fee) => {
    setSelectedAnnualFee((prevFee) => (prevFee === fee ? null : fee));
  };

  const handleBenefitsClick = (benefit) => {
    if (selectedBenefits.includes(benefit)) {
      setSelectedBenefits((prev) => prev.filter((b) => b !== benefit));
    } else if (selectedBenefits.length < 3) {
      setSelectedBenefits((prev) => [...prev, benefit]);
    }
  };

  const handleRemoveFilter = (filter) => {
    if (filter === selectedType) setSelectedType(null);
    else if (filter === selectedAnnualFee) setSelectedAnnualFee(null);
    else setSelectedBenefits((prev) => prev.filter((b) => b !== filter));
  };

  useSessionClearOnMain();
  return (
    <div className="card-pick">
      <h2>카드 PICK</h2>

      <div className="content">
        <aside className="sidebar">
          {/* 카드 종류 필터 */}
          <h3 onClick={() => toggleSection("type")}>
            카드 종류{" "}
            <span className="toggle-icon">
              {toggleState.type ? <UpOutlined /> : <DownOutlined />}
            </span>
          </h3>
          {toggleState.type && (
            <div className="filter-tags">
              <Tag
                onClick={() => handleTypeClick("신용카드")}
                color={selectedType === "신용카드" ? "blue" : "default"}
              >
                신용카드
              </Tag>
              <Tag
                onClick={() => handleTypeClick("체크카드")}
                color={selectedType === "체크카드" ? "blue" : "default"}
              >
                체크카드
              </Tag>
            </div>
          )}

          {/* 연회비 필터 */}
          <h3 onClick={() => toggleSection("fee")}>
            연회비{" "}
            <span className="toggle-icon">
              {toggleState.fee ? <UpOutlined /> : <DownOutlined />}
            </span>
          </h3>
          {toggleState.fee && (
            <div className="filter-tags">
              {["1만원 이하", "1만원 ~ 3만원", "3만원 ~ 5만원", "상관없음"].map(
                (fee) => (
                  <Tag
                    key={fee}
                    onClick={() => handleFeeClick(fee)}
                    color={selectedAnnualFee === fee ? "blue" : "default"}
                  >
                    {fee}
                  </Tag>
                )
              )}
            </div>
          )}

          {/* 혜택 필터 */}
          <h3 onClick={() => toggleSection("benefits")}>
            원하는 혜택 (최대 3개){" "}
            <span className="toggle-icon">
              {toggleState.benefits ? <UpOutlined /> : <DownOutlined />}
            </span>
          </h3>
          {toggleState.benefits && (
            <div className="filter-tags">
              {[
                "모든 가맹점",
                "대중교통",
                "통신",
                "주유/자동차",
                "쇼핑/마트",
                "외식",
                "온라인",
                "OTT/배달",
                "관리비",
                "커피",
                "교육/육아",
                "영화/문화",
                "숙박/발렛파킹",
                "병원",
                "공항 라운지",
                "애완동물",
                "레저/스포츠",
              ].map((benefit) => (
                <Tag
                  key={benefit}
                  onClick={() => handleBenefitsClick(benefit)}
                  color={
                    selectedBenefits.includes(benefit) ? "blue" : "default"
                  }
                >
                  {benefit}
                </Tag>
              ))}
            </div>
          )}
        </aside>

        {/* 카드 목록과 필터 적용 */}
        <div className="main-content">
          <div className="selected-filters">
            {[selectedType, selectedAnnualFee, ...selectedBenefits].map(
              (filter, index) =>
                filter && (
                  <Tag
                    key={index}
                    closable
                    onClose={() => handleRemoveFilter(filter)}
                  >
                    {filter}
                  </Tag>
                )
            )}
            {(selectedType ||
              selectedAnnualFee ||
              selectedBenefits.length > 0) && (
              <Button
                className="reset-filters-button"
                onClick={() => {
                  setSelectedType(null);
                  setSelectedAnnualFee(null);
                  setSelectedBenefits([]);
                }}
              >
                필터 초기화
              </Button>
            )}
          </div>

          <div className="card-list">
            {paginatedCards.map((card, index) => (
              <div key={index} className="card-item">
                <img src={card.image} alt={card.title} className="card-image" />
                <div className="card-details">
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                  <div className="card-features">
                    {card.benefits.map((benefit, i) => (
                      <div key={i} className="feature-item">
                        <img
                          src={benefit.image}
                          alt={benefit.name}
                          className="feature-icon"
                        />
                        <div className="feature-text">
                          <span className="feature-title">{benefit.name}</span>
                          <span className="feature-description">
                            {benefit.detail}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="card-buttons">
                    <button
                      className="details-button"
                      onClick={() => window.open(card.detailsLink, "_blank")}
                    >
                      자세히보기
                    </button>
                    <button
                      className="apply-button"
                      onClick={() => window.open(card.applyLink, "_blank")}
                    >
                      카드신청
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredCards.length > pageSize && (
              <div className="pagination">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredCards.length}
                  onChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPick;
