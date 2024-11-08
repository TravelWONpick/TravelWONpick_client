// Event.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import { Pagination } from "antd";
import "./event.css";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("active");
  const pageSize = 2;

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/events`);
      const eventData = response.data?.data?.events || [];
      const updatedEvents = eventData.map((event) => ({
        ...event,
        status: isEventActive(event.startDate, event.endDate),
      }));
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const isEventActive = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return today >= start && today <= end ? "active" : "inactive";
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => event.status === filter);
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
      <h2>이벤트</h2>
      <div className="event-filter">
        <button
          className={`filter-button ${filter === "active" ? "active" : ""}`}
          onClick={() => handleFilterChange("active")}
        >
          진행 중 이벤트
        </button>
        <button
          className={`filter-button ${filter === "inactive" ? "active" : ""}`}
          onClick={() => handleFilterChange("inactive")}
        >
          종료된 이벤트
        </button>
      </div>
      <div className="event-list">
        {currentEvents.map((event) => {
          console.log("Event Date:", event.startDate, event.endDate); // 확인용 로그
          return (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              startDate={event.startDate}
              endDate={event.endDate}
              previewImgSrc={event.previewImage}
            />
          );
        })}
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredEvents.length}
        onChange={handlePageChange}
        className="pagination"
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default Event;
