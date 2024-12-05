import React from "react";
import { Layout, Typography } from "antd";
import AdminMenu from '../components/AdminMenu';

const { Content } = Layout;
const { Title } = Typography;

// const url = process.env.VITE_LOGGING_URL;
const url = "http://management-alb-1530886175.ap-northeast-2.elb.amazonaws.com:5601/app/dashboards#/view/e6d581b0-1164-4f63-8705-4e1508812a00?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-90d%2Fd%2Cto%3Anow))";

const LogDashBoard = () => {
  
  return (
    <Layout
      style={{
        minHeight: "80vh",
        background: "white",
        width: "100%",
        maxWidth: "950px",
        margin: "0 auto",
        padding: "20px",
        paddingTop: "30px",
      }}
    >
      <h2 className="text-2xl font-bold pb-5" style={{ textAlign: 'left' }}>
        "관리자님! 고생하십니다~!"
      </h2>
      <Layout style={{ background: "white", width: "100%" }}>
        <AdminMenu />
        <Layout style={{ background: "white", paddingLeft: "20px" }}>
          <Content style={{ padding: "24px", paddingTop: "8px" }}>
            <Title
              level={5}
              style={{ fontWeight: "bold", marginBottom: "16px", fontSize: "20px" }}
            >
              로그
            </Title>
            <div style={{ width: '100%', height: '800px', overflow: 'hidden' }}>
              <iframe
                src={url}
                width="100%"
                height="800"
                frameBorder="0"
                title="Grafana Dashboard"
                style={{
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: 'transparent'
                }}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LogDashBoard;