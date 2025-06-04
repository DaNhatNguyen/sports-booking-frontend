import React from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaFutbol, FaTableTennis, FaMapMarkerAlt, FaLanguage } from 'react-icons/fa';
import { GiTennisRacket } from 'react-icons/gi';
import { MdSportsTennis } from 'react-icons/md';
import logo from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {

  const [showOverlay, setShowOverlay] = useState(false);
  const target = useRef(null);

  return (
    <Navbar bg="white" expand="lg" className="border-bottom py-2">
      <Container className="px-3 px-lg-5">
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Hi5Sport"
            height="40"
          />
        </Navbar.Brand>

        <Nav className="me-auto align-items-center">
          <Nav.Link href="/" className="fw-bold text-danger">Trang chủ</Nav.Link>
          <Nav.Link href="/partner">Dành cho đối tác</Nav.Link>
          <Nav.Link href="/football"><FaFutbol /> Bóng đá</Nav.Link>
          <Nav.Link href="/tennis"><MdSportsTennis /> Tennis</Nav.Link>
          <Nav.Link href="/badminton"><GiTennisRacket /> Cầu lông</Nav.Link>
          <Nav.Link href="/pingpong"><FaTableTennis /> Bóng bàn</Nav.Link>
        </Nav>

        <Nav className="align-items-center">
          <div className="d-flex align-items-center me-3">
            <FaMapMarkerAlt className="me-1 text-danger" />
            <div>
              <div className="text-uppercase" style={{ fontSize: '0.75rem', lineHeight: '1' }}>Khu vực</div>
              <div style={{ fontSize: '0.875rem' }}>Thanh Xuân, Hà Nội</div>
            </div>
          </div>
          <span
            ref={target}
            className="d-flex align-items-center cursor-pointer"
            onClick={() => setShowOverlay(!showOverlay)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="https://i.pravatar.cc/300"
              alt="avatar"
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            Nguyễn Đa Nhất
          </span>

          <Overlay target={target.current} show={showOverlay} placement="bottom-end" rootClose onHide={() => setShowOverlay(false)}>
            <Popover id="popover-user-menu">
              <Popover.Body>
                <div className="d-flex flex-column">
                  <a href="/profile" className="mb-2 text-decoration-none text-dark">👤 Hồ sơ cá nhân</a>
                  <a href="/settings" className="mb-2 text-decoration-none text-dark">⚙️ Cài đặt</a>
                  <hr className="my-2" />
                  <a href="/logout" className="text-danger text-decoration-none">🚪 Đăng xuất</a>
                </div>
              </Popover.Body>
            </Popover>
          </Overlay>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
