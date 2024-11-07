import React, { useState } from 'react';
import { Tag, Button, Pagination } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import './CardPick.css';
import image1 from '../assets/card1.png';
import image2 from '../assets/card2.png';
import image3 from '../assets/card3.png';

const CardPick = () => {
  const cards = [
    {
      title: '카드의정석 EVERY DISCOUNT',
      description: '결제도 간편 혜택도 간편',
      annualFee: '1만원 이하',
      image: image1,
      detailsLink: 'https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S02.do?cdPrdCd=103729',
      applyLink: 'https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S03.do?cdPrdCd=103729',
      type: '신용카드',
      categories: ['모든 가맹점', '온라인'],
      features: [
        { icon: '💳', title: '국내외 가맹점 0.8% 청구할인', description: '전월실적, 할인한도 없음' },
        { icon: '💸', title: '국내 온라인 간편결제 2% 추가 청구할인', description: '우리페이, 네이버페이, 카카오페이' }
      ]
    },
    {
      title: '카드의정석 EVERY POINT',
      description: '모두를 위한 간편한 혜택',
      annualFee: '1만원 ~ 3만원',
      image: image2,
      detailsLink: 'https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S02.do?cdPrdCd=102718',
      applyLink: 'https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S03.do?cdPrdCd=102718',
      type: '신용카드',
      categories: ['모든 가맹점', '온라인', '교육/육아'],
      features: [
        { icon: '💳', title: '국내외 가맹점 0.8% 적립', description: '전월실적, 적립한도 없음' },
        { icon: '💸', title: '국내 온라인 간편결제 2% 추가적립', description: '우리WON페이, 네이버페이, 카카오페이' },
        { icon: '👶', title: '청소년 가족카드 발급 가능', description: '' }
      ]
    },
    {
      title: '카드의정석 TEN',
      description: '일상에서의 특별한 혜택',
      annualFee: '3만원 ~ 5만원',
      image: image3,
      detailsLink: 'https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S02.do?cdPrdCd=103686',
      applyLink: 'https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S03.do?cdPrdCd=103686',
      type: '체크카드',
      categories: ['커피', '외식'],
      features: [
        { icon: '☕', title: '커피, 편의점, 교통, 이동통신 10% 청구할인', description: '' },
        { icon: '🍔', title: '음식점/주점 및 온라인 간편결제 1% 청구할인', description: '' }
      ]
    },
    {
      title: '카드의정석 TEN',
      description: '일상에서의 특별한 혜택',
      annualFee: '3만원 ~ 5만원',
      image: image3,
      detailsLink: 'https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S02.do?cdPrdCd=103686',
      applyLink: 'https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S03.do?cdPrdCd=103686',
      type: '체크카드',
      categories: ['커피', '외식'],
      features: [
        { icon: '☕', title: '커피, 편의점, 교통, 이동통신 10% 청구할인', description: '' },
        { icon: '🍔', title: '음식점/주점 및 온라인 간편결제 1% 청구할인', description: '' }
      ]
    }
  ];

  const [selectedType, setSelectedType] = useState(null);
  const [selectedAnnualFee, setSelectedAnnualFee] = useState(null);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [toggleState, setToggleState] = useState({
    type: true,
    fee: true,
    benefits: true,
  });

  const filterCards = () => {
    return cards.filter(card => {
      const typeMatch = selectedType ? card.type === selectedType : true;
      const feeMatch = selectedAnnualFee && selectedAnnualFee !== '상관없음'
          ? card.annualFee === selectedAnnualFee
          : true;
      const benefitsMatch = selectedBenefits.length > 0
          ? selectedBenefits.every(benefit => card.categories.includes(benefit))
          : true;
      return typeMatch && feeMatch && benefitsMatch;
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const filteredCards = filterCards();
  const paginatedCards = filteredCards.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleSection = section => {
    setToggleState(prevState => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleTypeClick = (type) => {
    setSelectedType(prevType => (prevType === type ? null : type));
  };

  const handleFeeClick = (fee) => {
    setSelectedAnnualFee(prevFee => (prevFee === fee ? null : fee));
  };

  const handleBenefitsClick = (benefit) => {
    if (selectedBenefits.includes(benefit)) {
      setSelectedBenefits(prev => prev.filter(b => b !== benefit));
    } else if (selectedBenefits.length < 3) {
      setSelectedBenefits(prev => [...prev, benefit]);
    }
  };

  const handleRemoveFilter = filter => {
    if (filter === selectedType) setSelectedType(null);
    else if (filter === selectedAnnualFee) setSelectedAnnualFee(null);
    else setSelectedBenefits(prev => prev.filter(b => b !== filter));
  };

  return (
      <div className="card-pick">
        <h1>카드 PICK</h1>

        <div className="content">
          <aside className="sidebar">
            <h3 onClick={() => toggleSection('type')}>
              카드 종류 <span className="toggle-icon">{toggleState.type ? <UpOutlined /> : <DownOutlined />}</span>
            </h3>
            {toggleState.type && (
                <div className="filter-tags">
                  <Tag onClick={() => handleTypeClick('신용카드')} color={selectedType === '신용카드' ? 'blue' : 'default'}>
                    신용카드
                  </Tag>
                  <Tag onClick={() => handleTypeClick('체크카드')} color={selectedType === '체크카드' ? 'blue' : 'default'}>
                    체크카드
                  </Tag>
                </div>
            )}

            <h3 onClick={() => toggleSection('fee')}>
              연회비 <span className="toggle-icon">{toggleState.fee ? <UpOutlined /> : <DownOutlined />}</span>
            </h3>
            {toggleState.fee && (
                <div className="filter-tags">
                  {['1만원 이하', '1만원 ~ 3만원', '3만원 ~ 5만원', '상관없음'].map(fee => (
                      <Tag key={fee} onClick={() => handleFeeClick(fee)} color={selectedAnnualFee === fee ? 'blue' : 'default'}>
                        {fee}
                      </Tag>
                  ))}
                </div>
            )}

            <h3 onClick={() => toggleSection('benefits')}>
              원하는 혜택 (최대 3개) <span className="toggle-icon">{toggleState.benefits ? <UpOutlined /> : <DownOutlined />}</span>
            </h3>
            {toggleState.benefits && (
                <div className="filter-tags">
                  {['모든 가맹점', '대중교통', '통신', '주유/자동차', '쇼핑/마트', '외식', '온라인', 'OTT/배달', '관리비', '커피', '교육/육아', '영화/문화', '숙박/발렛파킹', '병원', '공항 라운지', '애완동물', '레저/스포츠'].map(benefit => (
                      <Tag key={benefit} onClick={() => handleBenefitsClick(benefit)} color={selectedBenefits.includes(benefit) ? 'blue' : 'default'}>
                        {benefit}
                      </Tag>
                  ))}
                </div>
            )}
          </aside>

          <div className="main-content">
            <div className="selected-filters">
              {[selectedType, selectedAnnualFee, ...selectedBenefits].map((filter, index) => (
                  filter && (
                      <Tag key={index} closable onClose={() => handleRemoveFilter(filter)}>
                        {filter}
                      </Tag>
                  )
              ))}
              {(selectedType || selectedAnnualFee || selectedBenefits.length > 0) && (
                  <Button className="reset-filters-button" onClick={() => {
                    setSelectedType(null);
                    setSelectedAnnualFee(null);
                    setSelectedBenefits([]);
                  }}>
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
                        {card.features.map((feature, i) => (
                            <div key={i} className="feature-item">
                              <div className="feature-icon"><span>{feature.icon}</span></div>
                              <div className="feature-text">
                                <span className="feature-title">{feature.title}</span>
                                <span className="feature-description">{feature.description}</span>
                              </div>
                            </div>
                        ))}
                      </div>
                      <div className="card-buttons">
                        <button className="details-button" onClick={() => window.open(card.detailsLink, '_blank')}>자세히보기</button>
                        <button className="apply-button" onClick={() => window.open(card.applyLink, '_blank')}>카드신청</button>
                      </div>
                    </div>
                  </div>
              ))}
              {filteredCards.length > pageSize && (
                  <div className="pagination">
                    <Pagination current={currentPage} pageSize={pageSize} total={filteredCards.length} onChange={handlePageChange} />
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default CardPick;
