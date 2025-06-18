import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginBg from '../assets/login-bg.png';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      alert('Vui lòng nhập email hoặc số điện thoại.');
      emailRef.current?.focus();
      return;
    }

    if (!password) {
      alert('Vui lòng nhập mật khẩu.');
      passwordRef.current?.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    const isEmailValid = emailRegex.test(email);
    const isPhoneValid = phoneRegex.test(email);

    if (!isEmailValid && !isPhoneValid) {
      alert('Email hoặc số điện thoại không hợp lệ.');
      emailRef.current?.focus();
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem('user', JSON.stringify({ ...user, token }));
      navigate('/');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: '100vh',
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        backgroundBlendMode: 'multiply',
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
            textDecoration: 'none',
          }}
        >
          &times;
        </Button>
        <p className="text-center text-muted small">HiSPORT - Đặt lịch online sân thể thao</p>

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại hoặc email</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Nhập Email"
                value={email}
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={() => setEmail('')}>✕</Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Mật khẩu</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                value={password}
                ref={passwordRef}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button
            variant="success"
            className="w-100 mt-3 mb-3 d-flex align-items-center justify-content-center"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Đang đăng nhập...
              </>
            ) : (
              'ĐĂNG NHẬP'
            )}
          </Button>

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