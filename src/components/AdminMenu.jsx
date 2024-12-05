import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;
const { Text } = Typography;
const { ItemGroup } = Menu;

const AdminMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('1');

  useEffect(() => {
    // URL이 변경될 때마다 현재 위치에 따라 selectedKey 업데이트
    const path = location.pathname;
    if (path.includes('/admin/userget')) {
      setSelectedKey('1');
    } else if (path.includes('/admin/monitoring')) {
      setSelectedKey('2');
    } else if (path.includes('/admin/log-dashboard')) {
      setSelectedKey('3');
    }
  }, [location.pathname]); // location.pathname이 변경될 때마다 실행

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case '1':
        navigate('/admin/userget');
        break;
      case '2':
        navigate('/admin/monitoring');
        break;
      case '3':
        navigate('/admin/log-dashboard');
        break;
      default:
        break;
    }
  };

  return (
    <Sider width={200} style={{ background: "white" }}>
      <Menu 
        mode="vertical" 
        selectedKeys={[selectedKey]}
        style={{ borderRight: 0 }}
        onClick={handleMenuClick}
      >
        <ItemGroup
          key="g1"
          title={
            <Text strong style={{ fontSize: "18px", fontWeight: "bold" }}>
              서비스 관리
            </Text>
          }
        >
          <Menu.Item key="1">
            회원 관리
          </Menu.Item>
        </ItemGroup>
        <ItemGroup
          key="g2"
          title={
            <Text strong style={{ fontSize: "18px", fontWeight: "bold" }}>
              데이터 관리
            </Text>
          }
        >
          <Menu.Item key="2">
            모니터링
          </Menu.Item>
          <Menu.Item key="3">
            로그 관리
          </Menu.Item>
        </ItemGroup>
      </Menu>
    </Sider>
  );
};

export default AdminMenu;