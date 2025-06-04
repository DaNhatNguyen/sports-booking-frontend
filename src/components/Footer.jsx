import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/logo.png'; // Đường dẫn đến logo
import boCongThuong from '../assets/bocongthuong.png'; // Đường dẫn đến icon đăng ký

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#003366', color: '#fff', fontSize: '0.9rem' }}>
      {/* Đăng ký */}
      <div style={{ backgroundColor: '#002c5f' }} className="py-4">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h5 className="fw-bold mb-1">Đặt sân nhanh chóng, tiết kiệm</h5>
              <p className="mb-0 text-muted">Hãy đăng ký và chúng tôi sẽ gửi những ưu đãi tốt nhất cho bạn</p>
            </Col>
            <Col md={4} className="mt-3 mt-md-0">
              <Form.Control type="email" placeholder="Địa chỉ e-mail của bạn" />
            </Col>
            <Col md={2} className="mt-3 mt-md-0">
              <Button variant="danger" className="w-100">Đăng kí</Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Nội dung footer */}
      <div className="py-5">
        <Container>
          <Row className="gy-4">
            <Col md={4}>
              <img src={logo} alt="logo" height={40} className="mb-3" />
              <p>A3.11 Block A Tòa nhà Sky Center 5B Phổ Quang, Phường 2, Quận Tân Bình, TP.HCM</p>
              <p><FaPhone className="me-2" />0904438369</p>
              <p><FaEnvelope className="me-2" />info@vietcas.vn</p>
            </Col>
            <Col md={4}>
              <h6 className="fw-bold mb-3">Quy định và chính sách</h6>
              <ul className="list-unstyled">
                <li>Hướng dẫn sử dụng</li>
                <li>Quy chế Hoạt động ứng dụng</li>
                <li>Thông tin về thanh toán</li>
                <li>Chính sách bảo mật thông tin cá nhân</li>
                <li>Thông tin chăm sóc khách hàng</li>
              </ul>
            </Col>
            <Col md={4}>
              <h6 className="fw-bold mb-3">Liên kết nhanh</h6>
              <ul className="list-unstyled">
                <li>Trang chủ</li>
                <li>Dành cho đối tác</li>
                <li>Tin tức</li>
              </ul>
              <img src={boCongThuong} alt="Bộ Công Thương" style={{ height: '40px', marginTop: '1rem' }} />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer bottom */}
      <div className="text-center py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <span className="text-light">
          Copyright © 2023 – <span className="text-danger">Hi5port</span>. All rights reserved.
          Designed by <span className="text-danger">Aegona</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
