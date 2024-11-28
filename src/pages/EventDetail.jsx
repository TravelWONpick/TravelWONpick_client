// EventDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
import axios from 'axios';
import './event.css';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // navigate 함수 생성
    const [eventDetail, setEventDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/events/${id}`);
                setEventDetail(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch event details:", error);
                setLoading(false);
            }
        };

        fetchEventDetail();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!eventDetail) {
        return <p>Failed to fetch event details.</p>;
    }

    // 날짜 형식 변환
    const formattedStartDate = eventDetail.startDate
        ? new Date(eventDetail.startDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        : '날짜 없음';

    const formattedEndDate = eventDetail.endDate
        ? new Date(eventDetail.endDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        : '날짜 없음';

    const handleNavigateToPricePick = () => {
        navigate('/pricePick'); // 특가픽 페이지로 이동
    };

    return (
        <div className="event-detail">
            <div className="event-detail-header">
                <h1 className="event-detail-title">{eventDetail.title}</h1>
                <span className="event-detail-date">
                    이벤트 기간: {formattedStartDate} ~ {formattedEndDate}
                </span>
            </div>
            <img src={eventDetail.image} alt={eventDetail.title} className="event-detail-image" />
            <button
                className="event-detail-button"
                onClick={handleNavigateToPricePick} // 버튼 클릭 이벤트 추가
            >
                항공권 예약하러 가기
            </button>
        </div>
    );
};

export default EventDetail;
