// src/components/routes/MainPage.jsx
import React from 'react';
import Slider from "react-slick";
import PropTypes from 'prop-types';
import '../../main.css';
import image1 from '../../assets/1.png';
import image2 from '../../assets/2.png';
import image3 from '../../assets/3.png';

// 커스텀 화살표 컴포넌트
const CustomPrevArrow = ({ onClick }) => (
    <div className="custom-arrow custom-prev" onClick={onClick}>
        &#10094; {/* 왼쪽 화살표 */}
    </div>
);

const CustomNextArrow = ({ onClick }) => (
    <div className="custom-arrow custom-next" onClick={onClick}>
        &#10095; {/* 오른쪽 화살표 */}
    </div>
);

CustomPrevArrow.propTypes = {
    onClick: PropTypes.func.isRequired,
};

CustomNextArrow.propTypes = {
    onClick: PropTypes.func.isRequired,
};

const MainPage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };

    const images = [
        { src: image1, link: "https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S02.do?cdPrdCd=103489" },
        { src: image2, link: "https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S02.do?cdPrdCd=102488" },
        { src: image3, link: "https://b2b.travelover.co.kr/main/159530" }
    ];

    const flightDeals = [
        {
            destination: '오사카(KIX)',
            price: '284,900원 ~',
            imgSrc: 'https://github.com/user-attachments/assets/8f4fe28a-38a5-4e3a-99b4-9659b15016bb'
        },
        {
            destination: '도쿄(NRT)',
            price: '362,700원 ~',
            imgSrc: 'https://github.com/user-attachments/assets/6c168935-1594-4b5c-8ccb-26d4b083d908'
        },
        {
            destination: '로스엔젤레스(LAX)',
            price: '901,400원 ~',
            imgSrc: 'https://github.com/user-attachments/assets/859707be-dc54-475f-a007-8e9317a6a5b3'
        },
        {
            destination: '파리(CDG)',
            price: '572,500원 ~',
            imgSrc: 'https://github.com/user-attachments/assets/70f80962-1151-4b40-9fba-903c743bc158'
        }
    ];

    return (
        <div className="main-page">
            {/* 상단 배너 */}
            <div className="main-banner">
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <a href={image.link} target="_blank" rel="noopener noreferrer">
                                <img src={image.src} alt={`slide-${index}`} className="banner-image" />
                            </a>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* 특가 항공권 섹션 */}
            <div className="flight-deals-container">
                <h2 className="flight-deals-title section-title">특가 항공권</h2>
                <div className="flight-deals">
                    {flightDeals.map((deal, index) => (
                        <div key={index} className="flight-deal-card">
                            <img src={deal.imgSrc} alt={deal.destination} className="flight-image" />
                            <div className="flight-info">
                                <span className="destination">{deal.destination}</span>
                                <span className="price">{deal.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
