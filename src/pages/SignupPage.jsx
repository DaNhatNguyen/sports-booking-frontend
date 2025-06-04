import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import signupBg from '../assets/login-bg.png';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: '100vh',
        backgroundImage: `url(${signupBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        backgroundBlendMode: 'multiply'
      }}
    >
      <div
        className="bg-white rounded shadow p-4"
        style={{ width: '100%', maxWidth: '400px', position: 'relative' }}
      >
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

        <h5 className="fw-bold text-center">Đăng ký</h5>
        <p className="text-center text-muted small">
          HIPORT - Đặt lịch online sân thể thao
        </p>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại hoặc email</Form.Label>
            <InputGroup>
              <Form.Control type="text" placeholder="Nhập số điện thoại hoặc email" />
              <Button variant="outline-secondary">✕</Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tên đầy đủ</Form.Label>
            <InputGroup>
              <Form.Control type="text" placeholder="Nhập họ và tên" />
              <Button variant="outline-secondary">✕</Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Nhập lại mật khẩu</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirm ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu"
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button variant="success" className="w-100">ĐĂNG KÝ</Button>

          <div className="text-center small mt-3">
            Bạn đã có tài khoản? <a href="/login" className="fw-bold">Đăng nhập</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
