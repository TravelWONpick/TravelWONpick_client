import React from "react";
import { Navigate } from "react-router-dom";
import { message } from "antd";

const AdminRoute = ({ children }) => {
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  if (!isAdmin) {
    // 관리자 권한이 없을 때 알림 메시지 띄움
    message.error("관리자 권한이 필요합니다.");
    // 리다이렉트할 페이지 설정 (예: 로그인 페이지로 이동)
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
