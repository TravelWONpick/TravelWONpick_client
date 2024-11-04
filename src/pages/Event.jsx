import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { Pagination } from 'antd';
import './event.css';

const Event = () => {
    // 현재 날짜와 비교하여 이벤트가 진행 중인지 종료되었는지 판별하는 함수
    const isEventActive = (startDate, endDate) => {
        const today = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        return today >= start && today <= end ? "active" : "inactive";
    };

    // 초기 이벤트 목록
    const initialEvents = [
        {
            id: 1,
            title: "반려동물 동반 탑승 온라인 예약 서비스 오픈",
            date: "2024-10-23 - 2024-11-30",
            previewImgSrc: "https://github.com/user-attachments/assets/7197b131-1260-41e9-934e-7cbe9bcce059",
            detailImgSrc: "https://github.com/user-attachments/assets/6670c7da-57af-462a-8d46-bb75d811f29d"
        },
        {
            id: 2,
            title: "동남아에서,쉼~",
            date: "2024-10-21 - 2024-10-28",
            previewImgSrc: "https://github.com/user-attachments/assets/9c40ff87-acc6-4bcf-8214-ef2c75bfc073",
            detailImgSrc: "https://github.com/user-attachments/assets/1a1f936a-7f55-4c30-a0bd-a4168a030fb3"
        },
        {
            id: 3,
            title: "이스타항공은 변경 수수료가 무료!",
            date: "2024-10-02 - 2025-03-29",
            previewImgSrc: "https://github.com/user-attachments/assets/9be32c77-f7ca-4817-ad6c-43f43f8b14ea",
            detailImgSrc: "https://github.com/user-attachments/assets/f1172abe-b282-4a57-8b63-d71aa1d0ce5f"
        },
        {
            id: 4,
            title: "이스타항공x신한카드, 결제하면 돌아오는거야~",
            date: "2024-10-02 - 2024-10-31",
            previewImgSrc: "https://github.com/user-attachments/assets/aa81da2a-558f-4565-ab9f-02b6a5d7c94e",
            detailImgSrc: "https://github.com/user-attachments/assets/44f3b964-88f3-4d65-a81f-cf7c50479e07"
        },
        {
            id: 5,
            title: "다카마쓰 포도알을 잡아라!",
            date: "2024-10-31 - 2024-11-08",
            previewImgSrc: "https://github.com/user-attachments/assets/73ed185f-5033-4b1e-8511-f99e4dd82184",
            detailImgSrc: "https://github.com/user-attachments/assets/39a631c1-7dd8-4ffd-a2bb-d50110556cf3"
        },
        {
            id: 6,
            title: "에어서울x라쿠텐트래블 민트에디션",
            date: "2024-10-21 - 2024-11-28",
            previewImgSrc: "https://github.com/user-attachments/assets/a3a8a4c3-b922-4996-af56-014feb6e8278",
            detailImgSrc: "https://github.com/user-attachments/assets/70791a9a-fe43-472f-9fbd-52cc90d71b86"
        }
    ];

    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("active");

    const pageSize = 2;

    // 이벤트 목록 초기화 (date에 따라 status 설정)
    useEffect(() => {
        const updatedEvents = initialEvents.map(event => {
            const [startDate, endDate] = event.date.split(" - ");
            return {
                ...event,
                status: isEventActive(startDate, endDate)
            };
        });
        setEvents(updatedEvents);
    }, []);

    const filteredEvents = events.filter(event => event.status === filter);
    const startIndex = (currentPage - 1) * pageSize;
    const currentEvents = filteredEvents.slice(startIndex, startIndex + pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (status) => {
        setFilter(status);
        setCurrentPage(1);
    };

    return (
        <div className="event-page">
            <h1>이벤트</h1>

            <div className="event-filter">
                <button
                    className={`filter-button ${filter === 'active' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('active')}
                >
                    진행 중 이벤트
                </button>
                <button
                    className={`filter-button ${filter === 'inactive' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('inactive')}
                >
                    종료된 이벤트
                </button>
            </div>

            <div className="event-list">
                {currentEvents.map(event => (
                    <EventCard
                        key={event.id}
                        title={event.title}
                        description={event.description}
                        date={event.date}
                        previewImgSrc={event.previewImgSrc}
                        detailImgSrc={event.detailImgSrc}
                    />
                ))}
            </div>

            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredEvents.length}
                onChange={handlePageChange}
                className="pagination"
                style={{ marginTop: '20px'}}
            />
        </div>
    );
};

export default Event;
