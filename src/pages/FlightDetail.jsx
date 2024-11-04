// FlightDetail.jsx

import React from 'react';
import { Layout, Menu, Typography, Table } from 'antd';
import { Link } from 'react-router-dom';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { ItemGroup } = Menu;

const FlightDetail = () => {
  const purchaseColumns = [
    { title: '성명', dataIndex: 'name', key: 'name', align: 'center' },
    { title: '좌수', dataIndex: 'seats', key: 'seats', align: 'center' },
    { title: '항공권가', dataIndex: 'ticketPrice', key: 'ticketPrice', align: 'center' },
    { title: '할인금액', dataIndex: 'discount', key: 'discount', align: 'center' },
    { title: '총 결제액', dataIndex: 'totalPrice', key: 'totalPrice', align: 'center' },
  ];

  const scheduleColumns = [
    { title: '편명', dataIndex: 'flightNumber', key: 'flightNumber', align: 'center' },
    { title: '여정', dataIndex: 'route', key: 'route', align: 'center' },
    { title: '탑승일', dataIndex: 'boardingDate', key: 'boardingDate', align: 'center' },
    { title: '탑승시간', dataIndex: 'boardingTime', key: 'boardingTime', align: 'center' },
    { title: '좌석', dataIndex: 'seat', key: 'seat', align: 'center' },
  ];

  const purchaseData = [
    {
      key: '1',
      name: '김상민',
      seats: '3',
      ticketPrice: '430,000',
      discount: '50,000',
      totalPrice: '380,000',
    },
  ];

  const scheduleData = [
    {
      key: '1',
      flightNumber: 'RS502',
      route: '서울/인천(ICN) → 나리타(NRT)',
      boardingDate: '2024.4.18 (목)',
      boardingTime: '2024.4.18 09:05',
      seat: '3석',
    },
    {
      key: '2',
      flightNumber: 'RS503',
      route: '나리타(NRT) → 서울/인천(ICN)',
      boardingDate: '2024.4.21 (일)',
      boardingTime: '2024.4.21 19:55',
      seat: '3석',
    },
  ];

  return (
    <Layout style={{
      minHeight: '80vh',
      background: 'white',
      width: '100%',
      maxWidth: '950px',
      margin: '0 auto',
      paddingLeft: '20px',
      paddingRight: '20px'
    }}>
      <div style={{ padding: '20px 24px'}}>
        <Title level={3}>
          "OOO님, 즐거운 비행 되시길 바랍니다!"
        </Title>
      </div>
      <Layout>
        <Sider width={200} style={{ background: 'white' }}>
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
                <Link to="/my/passenger" style={{ fontSize: '14px', color: 'inherit', textDecoration: 'none' }}>
                  탑승객 정보
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Text style={{ fontSize: '14px' }}>나의 회원정보</Text>
              </Menu.Item>
            </ItemGroup>
          </Menu>
        </Sider>
        <Layout style={{ background: 'white' }}>
          <Content style={{ padding: '24px', paddingTop: '8px' }}>
            <Title level={5} style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '20px' }}>
              항공권 구매정보
            </Title>
            <Table
              columns={purchaseColumns}
              dataSource={purchaseData}
              pagination={false}
              bordered
              style={{
                marginBottom: '30px',
                backgroundColor: 'white',
              }}
              components={{
                header: {
                  cell: ({ children, ...restProps }) => (
                    <th
                      {...restProps}
                      style={{
                        backgroundColor: '#0039FF',
                        color: 'white',
                        textAlign: 'center',
                      }}
                    >
                      {children}
                    </th>
                  ),
                },
              }}
            />
            <Title level={5} style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '20px' }}>
              여정
            </Title>
            <Table
              columns={scheduleColumns}
              dataSource={scheduleData}
              pagination={false}
              bordered
              style={{
                backgroundColor: 'white',
              }}
              components={{
                header: {
                  cell: ({ children, ...restProps }) => (
                    <th
                      {...restProps}
                      style={{
                        backgroundColor: '#0039FF',
                        color: 'white',
                        textAlign: 'center',
                      }}
                    >
                      {children}
                    </th>
                  ),
                },
              }}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default FlightDetail;
