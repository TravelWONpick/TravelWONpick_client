import React from "react";
import { Layout, Typography, Button } from "antd";
import failImage from "../assets/fail.gif";

const { Content } = Layout;
const { Title } = Typography;

const Fail = () => {
  return (
    <Layout
      style={{
        minHeight: "80vh",
        background: "white",
        width: "100%",
        maxWidth: "950px",
        margin: "0 auto",
        paddingLeft: "20px",
        paddingRight: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Content style={{ textAlign: "center", padding: "40px 0" }}>
        <img
          src={failImage}
          alt="결제 실패"
          style={{ width: "300px", height: "300px", margin: "0 auto" }}
        />
        <Title level={3} style={{ marginTop: "20px" }}>
          결제를 실패했어요.😢
        </Title>
        <div style={{ marginTop: "20px" }}>
          <Button type="default" href="/pricePick/payment">
            돌아가기
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Fail;
