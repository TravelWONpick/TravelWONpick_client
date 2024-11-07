import React from "react";
import { Layout, Typography } from "antd";
import successImage from "../assets/success.gif";

const { Content } = Layout;
const { Title } = Typography;

const Success = () => {
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
          src={successImage}
          alt="결제 성공"
          style={{ width: "300px", height: "300px", margin: "0 auto" }}
        />
        <Title level={3} style={{ marginTop: "20px" }}>
          결제를 완료했어요
        </Title>
      </Content>
    </Layout>
  );
};

export default Success;
