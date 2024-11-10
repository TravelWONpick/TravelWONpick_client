import React, { useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Button, Form, Input, Typography, Modal } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationConfirmed, setVerificationConfirmed] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    form.resetFields();
    setIsModalVisible(false);
    setShowVerification(false);
    setVerificationConfirmed(false);
    setIsEmailSent(false);
    setVerificationMessage("");
    setIsAllFieldsFilled(false);
  };

  const handleFieldsChange = (_, allFields) => {
    const allFieldsFilled = allFields.every((field) => field.value);
    setIsAllFieldsFilled(allFieldsFilled);
  };

  const handleEmailSend = () => {
    setIsEmailSent(true);
    setShowVerification(true);
    setVerificationMessage(`${email} (으)로 인증번호를 전송했습니다.`);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerificationConfirm = () => {
    setVerificationConfirmed(true);
    setVerificationMessage("이메일 인증이 확인되었습니다.");
  };

  // 공통 인풋 스타일
  const inputStyle = {
    height: "45px",
  };

  // 공통 버튼 스타일
  const buttonStyle = {
    height: "45px",
    fontSize: "16px",
  };

  return (
    <div className="border-b-2 border-gray-200">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[950px]">
          <div className="flex items-center h-15 px-4">
            <div className="w-40">
              <Link to="/">
                <img
                  src="src/assets/logo.png"
                  alt="우리카드 로고"
                  style={{ width: "130px", height: "auto", paddingTop: "14px" }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 120px)",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "360px", width: "100%", textAlign: "left" }}>
          <Title level={3} style={{ marginBottom: "20px" }}>
            로그인하고
            <br />
            다양한 혜택을 누려보세요.
          </Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "이메일을 입력하세요!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="email@example.com"
                style={{ ...inputStyle }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "비밀번호를 입력하세요!" }]}
            >
              <Input
                prefix={<LockOutlined />}
                type={passwordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력하세요."
                suffix={
                  passwordVisible ? (
                    <EyeTwoTone onClick={togglePasswordVisibility} />
                  ) : (
                    <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
                  )
                }
                style={{ ...inputStyle }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: "15px" }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  ...buttonStyle,
                  backgroundColor: "black",
                  borderColor: "black",
                }}
              >
                로그인
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                block
                onClick={handleOpenModal}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#0039FF",
                  borderColor: "#0039FF",
                }}
              >
                회원가입
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* 회원가입 모달 */}
        <Modal
          title={
            <div>
              <Title level={4} style={{ marginBottom: 0 }}>
                아직 회원이 아니신가요?
              </Title>
              <Text style={{ fontSize: "14px", color: "gray" }}>
                이메일 인증으로 간편하게 가입해 보세요!
              </Text>
            </div>
          }
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={400}
          afterClose={handleCloseModal}
        >
          <Form
            form={form}
            name="register"
            onFinish={(values) => console.log("회원가입 완료: ", values)}
            onFieldsChange={handleFieldsChange}
          >
            <Form.Item
              label={
                <Text style={{ fontSize: "14px", color: "#888" }}>이름</Text>
              }
              name="name"
              rules={[{ required: true, message: "이름을 입력해주세요" }]}
              style={{ marginBottom: "20px" }}
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="이름을 입력해주세요"
                style={{ ...inputStyle }}
              />
            </Form.Item>

            <Form.Item
              label={
                <Text style={{ fontSize: "14px", color: "#888" }}>
                  비밀번호
                </Text>
              }
              name="password"
              rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}
              style={{ marginBottom: "20px" }}
              labelCol={{ span: 24 }}
            >
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                style={{ ...inputStyle }}
                suffix={
                  passwordVisible ? (
                    <EyeTwoTone onClick={togglePasswordVisibility} />
                  ) : (
                    <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
                  )
                }
              />
            </Form.Item>

            <Form.Item
              label={
                <Text style={{ fontSize: "14px", color: "#888" }}>
                  비밀번호 재확인
                </Text>
              }
              name="confirmPassword"
              rules={[
                { required: true, message: "비밀번호를 다시 입력해주세요" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("비밀번호가 일치하지 않습니다.")
                    );
                  },
                }),
              ]}
              style={{ marginBottom: "20px" }}
              labelCol={{ span: 24 }}
            >
              <Input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해주세요"
                style={{ ...inputStyle }}
                suffix={
                  confirmPasswordVisible ? (
                    <EyeTwoTone onClick={toggleConfirmPasswordVisibility} />
                  ) : (
                    <EyeInvisibleOutlined
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  )
                }
              />
            </Form.Item>

            <Form.Item
              label={
                <Text style={{ fontSize: "14px", color: "#888" }}>이메일</Text>
              }
              name="email"
              rules={[{ required: true, message: "이메일을 입력해주세요" }]}
              style={{ marginBottom: "20px" }}
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="email@example.com"
                onChange={handleEmailChange}
                style={{ flex: 1 }}
                suffix={
                  <Button
                    type="primary"
                    onClick={handleEmailSend}
                    style={{
                      padding: "0 8px",
                      marginRight: "-8px",
                      backgroundColor: "#0039FF",
                      color: "white",
                    }}
                  >
                    {isEmailSent ? "재전송" : "전송"}
                  </Button>
                }
              />
            </Form.Item>

            {showVerification && (
              <Form.Item
                label={
                  <Text style={{ fontSize: "14px", color: "#0039FF" }}>
                    인증번호
                  </Text>
                }
                name="verification"
                rules={[{ required: true, message: "인증번호를 입력해주세요" }]}
                style={{ marginBottom: "20px" }}
                labelCol={{ span: 24 }}
              >
                <Input
                  placeholder="인증번호"
                  style={{ flex: 1 }}
                  suffix={
                    <Button
                      type="primary"
                      onClick={handleVerificationConfirm}
                      style={{
                        padding: "0 8px",
                        marginRight: "-8px",
                        backgroundColor: "#0039FF",
                        color: "#white",
                      }}
                    >
                      인증번호 확인
                    </Button>
                  }
                />
              </Form.Item>
            )}

            <Text
              style={{
                fontSize: "12px",
                color: "gray",
                marginBottom: "20px",
                display: showVerification ? "block" : "none",
              }}
            >
              {verificationMessage}
            </Text>

            <Form.Item
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "30px",
              }}
            >
              <Button
                type="default"
                onClick={handleCloseModal}
                style={{
                  ...buttonStyle,
                  marginRight: "8px",
                }}
              >
                이전
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  ...buttonStyle,
                  backgroundColor: isAllFieldsFilled ? "black" : "#d9d9d9",
                  borderColor: isAllFieldsFilled ? "black" : "#d9d9d9",
                  color: "white",
                }}
                disabled={!isAllFieldsFilled || !verificationConfirmed}
              >
                회원가입하기
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
