// flight.jsx

import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;

const Flight = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      {/* "OOO님, 즐거운 비행 되시길 바랍니다!" 텍스트 */}
      <div style={{ padding: '20px 24px', marginTop: '100px' }}>
        <Title level={3} style={{ margin: 0 }}>
          "OOO님, 즐거운 비행 되시길 바랍니다!"
        </Title>
      </div>
      <Layout>
        {/* 나의 예약 메뉴 위치 조정 */}
        <Sider width={200} style={{ background: '#f0f0f0', paddingTop: '95px' }}>
          <Menu
            mode="vertical"
            defaultSelectedKeys={['1']}
            style={{ borderRight: 0 }}
          >
            <ItemGroup key="g1" title={<Text strong style={{ fontSize: '18px', fontWeight: 'bold' }}>나의 예약</Text>}>
              <Menu.Item key="1">
                <Link to="/my/flight" style={{ fontSize: '14px', color: 'inherit', textDecoration: 'none' }}>
                  항공
                </Link>
              </Menu.Item>
            </ItemGroup>
            <ItemGroup key="g2" title={<Text strong style={{ fontSize: '18px', fontWeight: 'bold' }}>정보관리</Text>}>
              <Menu.Item key="2">
                <Text style={{ fontSize: '14px' }}>탑승객 정보</Text>
              </Menu.Item>
              <Menu.Item key="3">
                <Text style={{ fontSize: '14px' }}>나의 회원정보</Text>
              </Menu.Item>
            </ItemGroup>
          </Menu>
        </Sider>
        <Layout>
          {/* Content 상단 패딩 설정 */}
          <Content style={{ padding: '24px', paddingTop: '100px' }}>
            <Title level={5} style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '20px' }}>
              항공
            </Title>
            <div style={{
              backgroundColor: '#f0f0f0',
              padding: '20px',
              borderRadius: '4px',
              textAlign: 'center',
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text type="secondary">예약 내역이 없습니다</Text>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Flight;
