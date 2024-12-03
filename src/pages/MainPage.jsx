import React from 'react';
import Slider from "react-slick";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import '../css/main.css';
import useSessionClearOnMain from '../hooks/useSessionClearOnMain';


console.log(import.meta.env.VITE_APP_API_URL);

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
    const navigate = useNavigate(); // useNavigate 추가

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
        { src: "https://travelwonpick.s3.ap-northeast-2.amazonaws.com/main_img/1.png", link: "https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S02.do?cdPrdCd=103489" },
        { src: "https://travelwonpick.s3.ap-northeast-2.amazonaws.com/main_img/2.png", link: "https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S02.do?cdPrdCd=102488" },
        { src: "https://travelwonpick.s3.ap-northeast-2.amazonaws.com/main_img/3.png", link: "https://b2b.travelover.co.kr/main/159530" }
    ];

    const flightDeals = [
        {
            destination: '국내',
            price: '62,700원 ~',
            imgSrc: "https://travelwonpick.s3.ap-northeast-2.amazonaws.com/main_img/jeju.jpg"
        },
        {
            destination: '일본',
            price: '219,000원 ~',
            imgSrc: "https://travelwonpick.s3.ap-northeast-2.amazonaws.com/main_img/japan.png"
        },
        {
            destination: '동남아',
            price: '283,000원 ~',
            imgSrc: "https://travelwonpick.s3.ap-northeast-2.amazonaws.com/main_img/nhatrang.png"
        },
        {
            destination: '유럽&미주',
            price: '522,000원 ~',
            imgSrc: "https://travelwonpick.s3.ap-northeast-2.amazonaws.com/main_img/usa.png"
        }
    ];

    const handleCardClick = (category) => {
        navigate('/pricePick', { state: { selectedCategory: category } });
    };

    useSessionClearOnMain();

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
                        <div
                            key={index}
                            className="flight-deal-card"
                            onClick={() => handleCardClick(deal.destination)} // 클릭 시 카테고리 전달
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={deal.imgSrc} alt={deal.destination} className="flight-image" />
                            <div className="flight-info">
                                <div className="flight-text">
                                    <span className="destination">{deal.destination}</span>
                                    <span className="price">{deal.price}</span>
                                </div>
                                <div className="arrow-icon">›</div> {/* 오른쪽 화살표 아이콘 */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
