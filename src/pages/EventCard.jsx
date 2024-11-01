import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './event.css';

const EventCard = ({ title, description, date, previewImgSrc, detailImgSrc }) => (
    <Link
        to="/event-detail"
        state={{ title, description, date, imgSrc: detailImgSrc }} // detailImgSrc를 imgSrc로 전달
        className="event-card-link"
    >
        <div className="event-card">
            <img src={previewImgSrc} alt={title} className="event-image" />
            <div className="event-details">
                <span className="event-title">{title}</span>
                <p className="event-description">{description}</p>
                <span className="event-date">이벤트 기간: {date}</span>
            </div>
        </div>
    </Link>
);

EventCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    previewImgSrc: PropTypes.string.isRequired,
    detailImgSrc: PropTypes.string.isRequired,
};

export default EventCard;
