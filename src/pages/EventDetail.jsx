import React from 'react';
import { useLocation } from 'react-router-dom';
import './event.css';

const EventDetail = () => {
    const location = useLocation();
    const { title, date, imgSrc } = location.state || {};

    return (
        <div className="event-detail">
            {/* 제목과 이벤트 기간을 같은 행에 표시 */}
            <div className="event-detail-header">
                <h1 className="event-detail-title">{title}</h1>
                <span className="event-detail-date">이벤트 기간: {date}</span>
            </div>
            <img src={imgSrc} alt={title} className="event-detail-image" />
            <button className="event-detail-button">항공권 예약하러 가기</button>
        </div>
    );
};

export default EventDetail;
