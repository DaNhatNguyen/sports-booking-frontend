import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import loginBg from '../assets/login-bg.png'

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{
                height: '100vh',
                backgroundImage: `url(${loginBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                backgroundBlendMode: 'multiply'
            }}
        >
            <div
                className="bg-white rounded shadow p-4"
                style={{ position: 'relative', width: '100%', maxWidth: '400px' }}
            >
                <h5 className="fw-bold text-center">Đăng nhập</h5>
                <Button
                    variant="link"
                    onClick={() => navigate(-1)}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '15px',
                        fontSize: '20px',
                        color: '#000',
                        textDecoration: 'none'
                    }}
                >
                    &times;
                </Button>
                <p className="text-center text-muted small">HiSPORT - Đặt lịch online sân thể thao</p>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại hoặc email</Form.Label>
                        <InputGroup>
                            <Form.Control type="text" placeholder="Nhập Email" />
                            <Button variant="outline-secondary" onClick={() => { }}>✕</Button>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Mật khẩu</Form.Label>
                        <InputGroup>
                            <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Nhập mật khẩu" />
                            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </InputGroup>
                    </Form.Group>

                    <Button variant="success" className="w-100 mt-3 mb-3">ĐĂNG NHẬP</Button>

                    <div className="text-center small">
                        <a href="#">Quên mật khẩu?</a><br />
                        Bạn chưa có tài khoản? <a href="/signup" className="fw-bold">Đăng ký ngay.</a>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
