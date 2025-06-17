import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaFutbol, FaTableTennis, FaMapMarkerAlt } from 'react-icons/fa';
import {
  getStoredUser,
  fetchCurrentUser,
  clearUser,
} from '../services/authService';
import { GiTennisRacket } from 'react-icons/gi';
import { MdSportsTennis } from 'react-icons/md';
import logo from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const Header = () => {

  const [showOverlay, setShowOverlay] = useState(false);
  const target = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khu vực
  const [locationData, setLocationData] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);

  // Lấy dữ liệu từ file .json
  useEffect(() => {
    fetch('/locations.json')
      .then((res) => res.json())
      .then((data) => setLocationData(data));
  }, []);

  // Hiển thị khu vực đã chọn trước đó khi load lại trang
  useEffect(() => {
    const saved = localStorage.getItem('selectedLocation');
    if (saved) {
      const { province, district } = JSON.parse(saved);
      setSelectedProvince(province);
      setSelectedDistrict(district);
    }
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      const stored = getStoredUser();
      // console.log(stored)
      if (!stored || !stored.token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await fetchCurrentUser(stored.token);
        // console.log('userData', userData)
        setUser({ ...userData, token: stored.token });
      } catch (err) {
        console.warn('Token hết hạn hoặc không hợp lệ.');
        clearUser();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);


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

        <Nav className="me-auto align-items-center d-none d-lg-flex">
          <Nav.Link href="/football"><FaFutbol /> Bóng đá</Nav.Link>
          <Nav.Link href="/tennis"><MdSportsTennis /> Tennis</Nav.Link>
          <Nav.Link href="/badminton"><GiTennisRacket /> Cầu lông</Nav.Link>
          <Nav.Link href="/pingpong"><FaTableTennis /> Bóng bàn</Nav.Link>
        </Nav>

        <Nav className="align-items-center">
          <div className="d-flex align-items-center justify-content-between flex-grow-1 flex-wrap">
            {/* Khu vực */}
            <div className="location-wrapper me-3" onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
              <div className="d-flex align-items-center">
                <FaMapMarkerAlt className="me-1 text-danger" />
                <div>
                  <div className="text-uppercase" style={{ fontSize: '0.75rem', lineHeight: '1' }}>Khu vực</div>
                  <div style={{ fontSize: '0.875rem' }}>
                    {selectedDistrict && selectedProvince
                      ? `${selectedDistrict}, ${selectedProvince.name.replace(/^Tỉnh |^Thành phố /, '')}`
                      : "Chọn khu vực"}
                  </div>

                </div>
              </div>
            </div>

            {/* Người dùng */}
            {loading ? null : user ? (
              <>
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
                  {user.fullName}
                </span>

                <Overlay
                  target={target.current}
                  show={showOverlay}
                  placement="bottom-end"
                  rootClose
                  onHide={() => setShowOverlay(false)}
                >
                  <Popover id="popover-user-menu">
                    <Popover.Body>
                      <div className="d-flex flex-column">
                        <a href="/profile" className="mb-2 text-decoration-none text-dark">
                          Danh sách lịch đã đặt
                        </a>
                        <hr className="my-2" />
                        <a
                          href="#"
                          onClick={() => {
                            clearUser();
                            setUser(null);
                          }}
                          className="text-danger text-decoration-none"
                        >
                          Đăng xuất
                        </a>
                      </div>
                    </Popover.Body>
                  </Popover>
                </Overlay>
              </>
            ) : (
              <div className="d-flex gap-2">
                <a href="/login" className="btn btn-outline-primary btn-sm">Đăng nhập</a>
                <a href="/signup" className="btn btn-primary btn-sm d-none d-sm-inline-block">Đăng ký</a>
              </div>
            )}
          </div>
        </Nav>
      </Container>

      {/* Model location */}
      <Modal show={showModal} onHide={() => {
        setShowModal(false);
        setStep(1);
      }} size="lg" centered>
        <Modal.Header className="bg-primary text-white" closeButton>
          <Modal.Title>
            {step === 1 ? "Vui lòng chọn khu vực" : `Chọn quận/huyện tại ${selectedProvince.name}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
          {step === 1 && (
            <div className="row">
              {locationData.map((province, idx) => (
                <div
                  key={idx}
                  className="col-6 py-2 border-bottom"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedProvince(province);
                    setStep(2);
                  }}
                >
                  {province.name}
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="row">
              {selectedProvince.districts.map((district, idx) => (
                <div
                  key={idx}
                  className="col-6 py-2 border-bottom"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedDistrict(district);
                    setShowModal(false);
                    setStep(1);

                    // Lưu localStorage
                    localStorage.setItem(
                      "selectedLocation",
                      JSON.stringify({
                        province: selectedProvince,
                        district
                      })
                    );
                  }}
                >
                  {district}
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        {step === 2 && (
          <Modal.Footer>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => setStep(1)}>
              ← Quay lại
            </button>
          </Modal.Footer>
        )}
      </Modal>

    </Navbar>

  );
};

export default Header;
