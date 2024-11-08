// EventCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './event.css';

const EventCard = ({ id, title, startDate, endDate, previewImgSrc }) => {
    const formattedStartDate = startDate
        ? new Date(startDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        : '날짜 없음';
    const formattedEndDate = endDate
        ? new Date(endDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        : '날짜 없음';

    return (
        <Link
            to={`/event-detail/${id}`}
            className="event-card-link"
        >
            <div className="event-card">
                <img src={previewImgSrc} alt={title} className="event-image" />
                <div className="event-details">
                    <span className="event-title">{title}</span>
                    <br />
                    <span className="event-date">
                        이벤트 기간: {formattedStartDate} ~ {formattedEndDate}
                    </span>
                </div>
            </div>
        </Link>
    );
};

EventCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    previewImgSrc: PropTypes.string.isRequired,
};

export default EventCard;
