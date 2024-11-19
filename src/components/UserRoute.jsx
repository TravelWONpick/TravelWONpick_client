import React from "react";
import { Navigate } from "react-router-dom";
import { message } from "antd";

const UserRoute = ({ children }) => {
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  if (isAdmin) {
    // 관리자가 마이페이지에 접근하면 차단
    message.error("관리자는 마이페이지에 접근할 수 없습니다.");
    return <Navigate to="/" />; // 홈 페이지로 리디렉션
  }

  return children; // 일반 사용자는 접근 가능
};

export default UserRoute;
