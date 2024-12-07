import React from "react";
import { Layout, Typography } from "antd";
import AdminMenu from '../components/AdminMenu';

const { Content } = Layout;
const { Title } = Typography;

// const url = process.env.VITE_MONITORING_URL;
const url = "http://management-alb-1530886175.ap-northeast-2.elb.amazonaws.com:3000/d/4b545447f22/1-kubernetes-all-in-one-cluster-monitoring-kr-4?var-duration=5m&orgId=1&from=2024-12-07T07:04:51.687Z&to=2024-12-07T07:05:51.687Z&var-node=&var-instance=ip-10-0-135-254.ap-northeast-2.compute.internal&var-namespace=&var-pod=&refresh=auto&theme=light";

const Monitoring = () => {
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
        관리자님! 고생하십니다~!
      </h2>
      <Layout style={{ background: "white", width: "100%" }}>
        <AdminMenu />
        <Layout style={{ background: "white", paddingLeft: "20px" }}>
          <Content style={{ padding: "24px", paddingTop: "8px" }}>
            <Title
              level={5}
              style={{ fontWeight: "bold", marginBottom: "16px", fontSize: "20px" }}
            >
              모니터링
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

export default Monitoring;