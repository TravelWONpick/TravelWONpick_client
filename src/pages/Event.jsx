import React, { useState } from 'react';
import EventCard from './EventCard';
import { Pagination } from 'antd';
import './event.css';

const Event = () => {
    // 이벤트 목록, 각 이벤트는 미리보기 이미지와 상세 이미지가 있음
    const events = [
        {
            id: 1,
            title: "반려동물 동반 탑승 온라인 예약 서비스 오픈",
            date: "2024-10-23 - 2024-11-30",
            previewImgSrc: "https://github.com/user-attachments/assets/7197b131-1260-41e9-934e-7cbe9bcce059", // 미리보기 이미지 URL
            detailImgSrc: "https://github.com/user-attachments/assets/6670c7da-57af-462a-8d46-bb75d811f29d",   // 상세 페이지 이미지 URL
            status: "active"
        },
        {
            id: 2,
            title: "동남아에서,쉼~",
            date: "2024-10-21 - 2024-10-28",
            previewImgSrc: "https://github.com/user-attachments/assets/9c40ff87-acc6-4bcf-8214-ef2c75bfc073",
            detailImgSrc: "https://github.com/user-attachments/assets/1a1f936a-7f55-4c30-a0bd-a4168a030fb3",
            status: "active"
        },
        {
            id: 3,
            title: "이스타항공은 변경 수수료가 무료!",
            date: "2024-10-02 - 2025-03-29",
            previewImgSrc: "https://github.com/user-attachments/assets/9be32c77-f7ca-4817-ad6c-43f43f8b14ea",
            detailImgSrc: "https://github.com/user-attachments/assets/f1172abe-b282-4a57-8b63-d71aa1d0ce5f",
            status: "inactive"
        },
        {
            id: 4,
            title: "이스타항공x신한카드, 결제하면 돌아오는거야~",
            date: "2024-10-02 - 2024-10-31",
            previewImgSrc: "https://github.com/user-attachments/assets/aa81da2a-558f-4565-ab9f-02b6a5d7c94e",
            detailImgSrc: "https://github.com/user-attachments/assets/44f3b964-88f3-4d65-a81f-cf7c50479e07",
            status: "inactive"
        },
        {
            id: 5,
            title: "반려동물 동반 탑승 온라인 예약 서비스 오픈",
            date: "2024-10-23 - 2024-11-30",
            previewImgSrc: "https://github.com/user-attachments/assets/7197b131-1260-41e9-934e-7cbe9bcce059", // 미리보기 이미지 URL
            detailImgSrc: "https://github.com/user-attachments/assets/6670c7da-57af-462a-8d46-bb75d811f29d",   // 상세 페이지 이미지 URL
            status: "inactive"
        },
        {
            id: 6,
            title: "동남아에서,쉼~",
            date: "2024-10-21 - 2024-10-28",
            previewImgSrc: "https://github.com/user-attachments/assets/9c40ff87-acc6-4bcf-8214-ef2c75bfc073",
            detailImgSrc: "https://github.com/user-attachments/assets/1a1f936a-7f55-4c30-a0bd-a4168a030fb3",
            status: "inactive"
        },
        {
            id: 7,
            title: "이스타항공은 변경 수수료가 무료!",
            date: "2024-10-02 - 2025-03-29",
            previewImgSrc: "https://github.com/user-attachments/assets/9be32c77-f7ca-4817-ad6c-43f43f8b14ea",
            detailImgSrc: "https://github.com/user-attachments/assets/f1172abe-b282-4a57-8b63-d71aa1d0ce5f",
            status: "active"
        },
        {
            id: 8,
            title: "이스타항공x신한카드, 결제하면 돌아오는거야~",
            date: "2024-10-02 - 2024-10-31",
            previewImgSrc: "https://github.com/user-attachments/assets/aa81da2a-558f-4565-ab9f-02b6a5d7c94e",
            detailImgSrc: "https://github.com/user-attachments/assets/44f3b964-88f3-4d65-a81f-cf7c50479e07",
            status: "active"
        },
    ];

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [filter, setFilter] = useState("active"); // 필터 상태 (active/inactive)

    const pageSize = 2; // 페이지당 이벤트 수

    // 필터링된 이벤트 목록
    const filteredEvents = events.filter(event => event.status === filter);

    // 현재 페이지에 해당하는 이벤트 목록
    const startIndex = (currentPage - 1) * pageSize;
    const currentEvents = filteredEvents.slice(startIndex, startIndex + pageSize);

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 필터 변경 핸들러
    const handleFilterChange = (status) => {
        setFilter(status);
        setCurrentPage(1); // 필터 변경 시 페이지를 처음으로 리셋
    };

    return (
        <div className="event-page">
            <h1>이벤트</h1>

            {/* 필터 버튼 */}
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

            {/* 이벤트 카드 목록 */}
            <div className="event-list">
                {currentEvents.map(event => (
                    <EventCard
                        key={event.id}
                        title={event.title}
                        description={event.description}
                        date={event.date}
                        previewImgSrc={event.previewImgSrc} // 미리보기 이미지 URL 전달
                        detailImgSrc={event.detailImgSrc}   // 상세 이미지 URL 전달
                    />
                ))}
            </div>

            {/* 페이지네이션 */}
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredEvents.length}
                onChange={handlePageChange}
                style={{ marginTop: '20px', textAlign: 'center' }}
            />
        </div>
    );
};

export default Event;
