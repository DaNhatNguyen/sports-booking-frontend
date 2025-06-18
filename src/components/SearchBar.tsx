import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';
import CustomButton from './CustomButton';

// Kiểu dữ liệu cho tỉnh/thành
interface LocationData {
  name: string;
  districts: string[];
}

const SearchBar: React.FC = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [districts, setDistricts] = useState<string[]>([]);

  // Load dữ liệu tỉnh/thành từ file JSON
  useEffect(() => {
    fetch('/locations.json')
      .then((res) => res.json())
      .then((data: LocationData[]) => setLocations(data));
  }, []);

  // Cập nhật danh sách quận/huyện khi chọn tỉnh/thành
  useEffect(() => {
    const found = locations.find(loc => loc.name === selectedProvince);
    setDistricts(found ? found.districts : []);
  }, [selectedProvince, locations]);

  return (
    <div className="bg-white py-4 mtopCourt" style={{
      position: 'absolute',
      top: '-50px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10,
      width: '100%',
      maxWidth: '1140px'
    }}>
      <Container className="shadow rounded px-4 py-3 bg-white">
        <h5 className="fw-bold mb-1">Đặt sân thể thao ngay</h5>
        <p className="text-muted mb-4">Tìm kiếm sân chơi thể thao, thi đấu khắp cả nước</p>

        <Form>
          <Row className="g-2 align-items-center">
            <Col md={3} sm={6}>
              <Form.Select>
                <option>Chọn môn thể thao</option>
                <option>Bóng đá</option>
                <option>Tennis</option>
                <option>Cầu lông</option>
              </Form.Select>
            </Col>

            <Col md={3} sm={6}>
              <Form.Select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
              >
                <option><MdLocationCity /> Chọn tỉnh/thành phố</option>
                {locations.map((loc, idx) => (
                  <option key={idx} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={3} sm={6}>
              <Form.Select disabled={!districts.length}>
                <option><FaMapMarkerAlt /> Chọn quận/huyện</option>
                {districts.map((d, idx) => (
                  <option key={idx}>{d}</option>
                ))}
              </Form.Select>
            </Col>

            <Col md={3} sm={6}>
              <CustomButton type="submit" variant="danger" className="w-100">
                Tìm kiếm ngay
              </CustomButton>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default SearchBar;