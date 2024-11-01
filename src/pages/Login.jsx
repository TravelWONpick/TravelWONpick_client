import React, { useState } from 'react';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input, Typography, Modal } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [verificationConfirmed, setVerificationConfirmed] = useState(false);
    const [email, setEmail] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');
    const [form] = Form.useForm(); // Form instance 생성

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
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
        form.resetFields(); // 필드 초기화
        setIsModalVisible(false);
        setShowVerification(false);
        setVerificationConfirmed(false);
        setIsEmailSent(false);
        setVerificationMessage('');
        setIsAllFieldsFilled(false);
    };

    const handleFieldsChange = (_, allFields) => {
        const allFieldsFilled = allFields.every(field => field.value);
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
        setVerificationMessage("{email}의 인증이 확인 되었습니다.");
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                position: 'relative',
            }}
        >
            <Link to="/pricePick" style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <img
                    src="/temp_logo.png"
                    alt="우리카드 로고"
                    style={{ width: '170px', height: 'auto' }}
                />
            </Link>

            <div style={{ maxWidth: '360px', width: '100%', textAlign: 'left' }}>
                <Title level={3} style={{ marginBottom: '20px' }}>
                    로그인하고<br />다양한 혜택을 누려보세요.
                </Title>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: '이메일을 입력하세요!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="email@example.com"
                            style={{ padding: '10px' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '비밀번호를 입력하세요!' }]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="비밀번호를 입력하세요."
                            suffix={
                                passwordVisible ? (
                                    <EyeTwoTone onClick={togglePasswordVisibility} />
                                ) : (
                                    <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
                                )
                            }
                            style={{ padding: '10px' }}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: '15px' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{ backgroundColor: 'black', borderColor: 'black', height: '45px', fontSize: '16px' }}
                        >
                            로그인
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            block
                            onClick={handleOpenModal}
                            style={{ backgroundColor: '#0039FF', borderColor: '#0039FF', height: '45px', fontSize: '16px' }}
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
                        <Title level={4} style={{ marginBottom: 0 }}>아직 회원이 아니신가요?</Title>
                        <Text style={{ fontSize: '14px', color: 'gray' }}>
                            이메일 인증으로 간편하게 가입해 보세요!
                        </Text>
                    </div>
                }
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
                width={400}
                afterClose={handleCloseModal} // 모달 닫힌 후 필드 초기화
            >
                <Form
                    form={form} // form instance 연결
                    name="register"
                    onFinish={(values) => console.log('회원가입 완료: ', values)}
                    onFieldsChange={handleFieldsChange}
                >
                    <Form.Item
                        label={<Text style={{ fontSize: '14px', color: '#888' }}>이름</Text>}
                        name="name"
                        rules={[{ required: true, message: '이름을 입력해주세요' }]}
                        style={{ marginBottom: '20px' }}
                        labelCol={{ span: 24 }}
                    >
                        <Input placeholder="이름을 입력해주세요" />
                    </Form.Item>

                    <Form.Item
                        label={<Text style={{ fontSize: '14px', color: '#888' }}>이메일</Text>}
                        name="email"
                        rules={[{ required: true, message: '이메일을 입력해주세요' }]}
                        style={{ marginBottom: '20px' }}
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
                                    style={{ padding: '0 8px', marginRight: '-8px', backgroundColor: '#0039FF', color: 'white' }}
                                >
                                    {isEmailSent ? '재전송' : '전송'}
                                </Button>
                            }
                        />
                    </Form.Item>

                    {showVerification && (
                        <Form.Item
                            label={<Text style={{ fontSize: '14px', color: '#0039FF' }}>인증번호</Text>}
                            name="verification"
                            rules={[{ required: true, message: '인증번호를 입력해주세요' }]}
                            style={{ marginBottom: '20px' }}
                            labelCol={{ span: 24 }}
                        >
                            <Input
                                placeholder="인증번호"
                                style={{ flex: 1 }}
                                suffix={
                                    <Button
                                        type="primary"
                                        onClick={handleVerificationConfirm}
                                        style={{ padding: '0 8px', marginRight: '-8px', backgroundColor: '#0039FF', color: '#white' }}
                                    >
                                        인증번호 확인
                                    </Button>
                                }
                            />
                        </Form.Item>
                    )}

                    <Text style={{ fontSize: '12px', color: 'gray', marginBottom: '20px', display: showVerification ? 'block' : 'none' }}>
                        {verificationMessage}
                    </Text>

                    {verificationConfirmed && (
                        <>
                            <Form.Item
                                label={<Text style={{ fontSize: '14px', color: '#888' }}>비밀번호</Text>}
                                name="password"
                                rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
                                style={{ marginBottom: '20px' }}
                                labelCol={{ span: 24 }}
                            >
                                <Input
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="비밀번호를 입력해주세요"
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
                                label={<Text style={{ fontSize: '14px', color: '#888' }}>비밀번호 재확인</Text>}
                                name="confirmPassword"
                                rules={[
                                    { required: true, message: '비밀번호를 다시 입력해주세요' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                                        },
                                    }),
                                ]}
                                style={{ marginBottom: '20px' }}
                                labelCol={{ span: 24 }}
                            >
                                <Input
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    placeholder="비밀번호를 다시 입력해주세요"
                                    suffix={
                                        confirmPasswordVisible ? (
                                            <EyeTwoTone onClick={toggleConfirmPasswordVisibility} />
                                        ) : (
                                            <EyeInvisibleOutlined onClick={toggleConfirmPasswordVisibility} />
                                        )
                                    }
                                />
                            </Form.Item>
                        </>
                    )}

                    <Form.Item style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                        <Button
                            type="default"
                            onClick={handleCloseModal}
                            style={{
                                fontSize: '16px',
                                height: '45px',
                                marginRight: '8px'
                            }}
                        >
                            &lt; 이전
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                backgroundColor: isAllFieldsFilled ? 'black' : '#d9d9d9',
                                borderColor: isAllFieldsFilled ? 'black' : '#d9d9d9',
                                color: 'white',
                                height: '45px',
                                fontSize: '16px',
                            }}
                            disabled={!isAllFieldsFilled}
                        >
                            회원가입하기
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Login;
