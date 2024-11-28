import React, { useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Button, Form, Input, Typography, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from '../components/axios';

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
  const navigate = useNavigate();

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

  const handlePhoneChange = (e) => {
    let { value } = e.target;
    value = value.replace(/[^0-9]/g, "");
    if (value.length <= 11) {
      if (value.length > 3 && value.length <= 7) {
        value = `${value.slice(0, 3)}-${value.slice(3)}`;
      } else if (value.length > 7) {
        value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
      }
      form.setFieldsValue({ phone: value });
    }
  };

  const handleFieldsChange = (_, allFields) => {
    const allFieldsFilled = allFields.every((field) => field.value);
    setIsAllFieldsFilled(allFieldsFilled);
  };

  const handleEmailSend = async () => {
    try {
      const phoneWithoutHyphen = form.getFieldValue("phone").replace(/-/g, "");
      const response = await api.post('/auth/verifyuser', {
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password"),
        name: form.getFieldValue("name"),
        phonenumber: phoneWithoutHyphen,
      }, {
        headers: { 
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` 
        }
      });

      if (response.status === 200) {
        setIsEmailSent(true);
        setShowVerification(true);
        setVerificationMessage(`${email} (으)로 인증번호를 전송했습니다.`);
        // 이메일 필드의 에러 메시지 초기화
        form.setFields([
          {
            name: 'email',
            errors: [],
          },
        ]);
      }
    } catch (error) {
      // 서버로부터 받은 에러 메시지 추출
      let errorMessage = "인증번호 전송에 실패했습니다. 다시 시도해주세요.";

      if (error.response && error.response.data) {
        if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }

      // 이메일 필드에 에러 메시지 설정
      form.setFields([
        {
          name: 'email',
          errors: [errorMessage],
        },
      ]);
    }
  };


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    form.setFields([
      {
        name: 'email',
        errors: [],
      },
    ]);
  };

  const handleVerificationConfirm = async () => {
    try {
      const response = await api.post('/auth/verifysuccess', {
        email: form.getFieldValue("email"),
        confirmationCode: form.getFieldValue("verification"),
      }, {
        headers: { 
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` 
        }
      });

      if (response.status === 200) {
        setVerificationConfirmed(true);
        setVerificationMessage("이메일 인증이 확인되었습니다.");
        form.setFields([
          { name: "name", disabled: true },
          { name: "phone", disabled: true },
          { name: "password", disabled: true },
          { name: "confirmPassword", disabled: true },
        ]);
      }
    } catch (error) {
      console.error("인증번호 확인 중 오류가 발생했습니다: ", error);
      setVerificationMessage("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
    }
  };

  const handleSignupSubmit = async () => {
    try {
      const response = await api.post('/auth/signup', {
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password"),
        name: form.getFieldValue("name"),
        phonenumber: form.getFieldValue("phone").replace(/-/g, ""),
        notification: true,
      }, {
        headers: { 
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` 
        }
      });

      if (response.status === 200) {
        Modal.success({
          title: "회원가입 성공",
          content: "회원가입이 완료되었습니다.",
        });
        handleCloseModal();
      }
    } catch (error) {
      console.error("회원가입 중 오류가 발생했습니다:", error);
    }
  };

  const handleLoginSubmit = async (values) => {
    try {
      const { email, password } = values;

      if (!email || !password) {
        console.error("이메일 또는 비밀번호가 비어 있습니다.");
        return;
      }

      const response = await api.post('/auth/login', {
        email,
        password,
      });

      if (response.status === 200 && response.data && response.data.data) {
        const { accessToken, name, isAdmin } = response.data.data;
        if (accessToken) {

          // accessToken,isAdmin 을 sessionStorage에 저장
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("isAdmin", isAdmin);

          // 사용자 이름을 sessionStorage 저장
          sessionStorage.setItem("userName", name);

          navigate("/");
        } else {
          console.error("서버에서 accessToken을 받지 못했습니다.");
        }
      } else {
        console.error("로그인 중 문제가 발생했습니다. 응답을 확인해 주세요.");
      }
    } catch (error) {
      console.error("로그인 중 오류가 발생했습니다:", error.response?.data);
    }
  };

  const inputStyle = {
    height: "45px",
  };

  const buttonStyle = {
    height: "45px",
    fontSize: "16px",
  };

  return (

      <><div className="flex justify-center w-full">
      <div className="w-full max-w-[950px]">
        <div className="flex items-center h-15 px-4">
          <div className="w-40">
            <Link to="/">
              <img
                src="src/assets/logo.png"
                alt="우리카드 로고"
                style={{ width: "130px", height: "auto", paddingTop: "14px" }} />
            </Link>
          </div>
        </div>
      </div>
    </div><div
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
            onFinish={handleLoginSubmit}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "이메일을 입력하세요!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="email@example.com"
                style={{ ...inputStyle }}
                onChange={handleEmailChange} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "비밀번호를 입력하세요!" }]}
            >
              <Input
                prefix={<LockOutlined />}
                type={passwordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력하세요."
                suffix={passwordVisible ? (
                  <EyeTwoTone onClick={togglePasswordVisibility} />
                ) : (
                  <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
                )}
                style={{ ...inputStyle }} />
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
          title={<div>
            <Title level={4} style={{ marginBottom: 0 }}>
              아직 회원이 아니신가요?
            </Title>
            <Text style={{ fontSize: "14px", color: "gray" }}>
              이메일 인증으로 간편하게 가입해 보세요!
            </Text>
          </div>}
          open={isModalVisible}
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
              label={<Text style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>이름</Text>}
              name="name"
              rules={[{ required: true, message: "이름을 입력해주세요" }]}
              style={{ marginBottom: "20px" }}
              labelCol={{ span: 24 }}
              required={false}
            >
              <Input
                placeholder="이름을 입력해주세요"
                style={{ ...inputStyle }}
                disabled={verificationConfirmed} />
            </Form.Item>

            <Form.Item
              label={<Text style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>
                휴대폰번호
              </Text>}
              name="phone"
              rules={[
                { required: true, message: "휴대폰 번호를 입력하세요!" },
                {
                  pattern: /^\d{3}-\d{4}-\d{4}$/,
                  message: "휴대폰 번호 형식이 올바르지 않습니다. (010-1234-5678)"
                }
              ]}
              style={{ marginBottom: "20px" }}
              labelCol={{ span: 24 }}
              required={false}
            >
              <Input
                placeholder="000-0000-0000"
                style={{ ...inputStyle }}
                maxLength={13}
                onChange={handlePhoneChange}
                disabled={verificationConfirmed} />
            </Form.Item>

            <Form.Item
              label={<Text style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>
                비밀번호
              </Text>}
              name="password"
              rules={[
                { required: true, message: "비밀번호를 입력하세요!" },
                { min: 6, message: "비밀번호를 6자리 이상 입력해주세요." }
              ]}
              style={{ marginBottom: "20px" }}
              labelCol={{ span: 24 }}
              required={false}
            >
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                style={{ ...inputStyle }}
                suffix={passwordVisible ? (
                  <EyeTwoTone onClick={togglePasswordVisibility} />
                ) : (
                  <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
                )} />
            </Form.Item>

            <Form.Item
              label={<Text style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>
                비밀번호 재확인
              </Text>}
              name="confirmPassword"
              rules={[
                { required: true, message: "비밀번호를 다시 입력해주세요" },
                { min: 6, message: "비밀번호를 6자리 이상 입력해주세요." },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
                  },
                }),
              ]}
              style={{ marginBottom: "20px" }}
              labelCol={{ span: 24 }}
              required={false}
            >
              <Input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해주세요"
                style={{ ...inputStyle }}
                suffix={confirmPasswordVisible ? (
                  <EyeTwoTone onClick={toggleConfirmPasswordVisibility} />
                ) : (
                  <EyeInvisibleOutlined
                    onClick={toggleConfirmPasswordVisibility} />
                )} />
            </Form.Item>

            <Form.Item
              label={<Text style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>이메일</Text>}
              name="email"
              rules={[{ required: true, message: "이메일을 입력해주세요" }]}
              style={{ marginBottom: "20px" }}
              labelCol={{ span: 24 }}
              required={false}
            >
              <Input
                placeholder="email@example.com"
                onChange={handleEmailChange}
                style={{ flex: 1 }}
                suffix={<Button
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
                </Button>} />
            </Form.Item>

            {showVerification && (
              <Form.Item
                label={<Text style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>
                  인증번호
                </Text>}
                name="verification"
                rules={[{ required: true, message: "인증번호를 입력해주세요" }]}
                style={{ marginBottom: "20px" }}
                labelCol={{ span: 24 }}
                required={false}
              >
                <Input
                  placeholder="인증번호"
                  style={{ flex: 1 }}
                  suffix={<Button
                    type="primary"
                    onClick={handleVerificationConfirm}
                    style={{
                      padding: "0 8px",
                      marginRight: "-8px",
                      backgroundColor: "#0039FF",
                      color: "white",
                    }}
                  >
                    인증번호 확인
                  </Button>} />
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
                onClick={handleSignupSubmit}
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
      </div></>
  );
};

export default Login;
