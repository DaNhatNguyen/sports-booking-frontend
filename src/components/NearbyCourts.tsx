import React, { useState, useEffect } from 'react';
import {
  Container, Card, Modal, Tabs, Tab, Button, Badge
} from 'react-bootstrap';
import {
  FaMapMarkerAlt, FaStar
} from 'react-icons/fa';
import { getCourtsByLocation } from '../services/courtService';
import { Court } from '../types/court';
import { checkLoginAndRedirect } from '../utils/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NearbyCourts: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const location = JSON.parse(localStorage.getItem('selectedLocation') || '{}');
        const { province, district } = location;
        // console.log(province.name)

        if (!province?.name || !district) {
          console.warn('Thiếu thông tin địa phương.');
          return;
        }

        const data = await getCourtsByLocation(province.name, district);
        setCourts(data);
      } catch (err) {
        console.error('Lỗi khi gọi API sân:', err);
      }
    };

    fetchCourts();

    // Gọi lại mỗi khi khu vực thay đổi
    const handleLocationChange = () => {
      fetchCourts();
    };

    window.addEventListener('locationChanged', handleLocationChange);
    return () => window.removeEventListener('locationChanged', handleLocationChange);
  }, []);

  return (
    <Container className="my-5">
      <h4 className="fw-bold">Sân gần bạn</h4>
      <p className="text-muted">Khu vực được đề xuất gần vị trí của bạn</p>

      <div className="d-flex gap-2 flex-wrap mb-4">
        <Badge pill bg="dark" text="light">Tất cả</Badge>
        <Badge pill bg="light" text="dark" className="border">Bóng đá</Badge>
        <Badge pill bg="light" text="dark" className="border">Tennis</Badge>
        <Badge pill bg="light" text="dark" className="border">Cầu lông</Badge>
        <Badge pill bg="light" text="dark" className="border">Bóng bàn</Badge>
      </div>

      <div className="d-flex flex-wrap gap-4 justify-content-start">
        {courts.length === 0 ? (
          <div className="text-muted fst-italic px-2">
            Không có sân nào phù hợp với khu vực đã chọn hoăc chưa có dữ liệu.
          </div>
        ) : (
          courts.map((court) => (
            <div
              key={court._id}
              className="shadow-sm bg-white rounded"
              style={{
                flex: '1 1 calc(25% - 1rem)',
                minWidth: '260px',
                maxWidth: '300px',
                cursor: 'pointer'
              }}
              onClick={() => {
                setSelectedCourt(court);
                setShowDetail(true);
              }}
            >
              <Card className="h-100 border-0">
                <Card.Img
                  variant="top"
                  src={court.images?.[0] || '/default-image.png'}
                  style={{ height: '160px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <div className="text-muted small mb-1">
                    Mở cửa: {court.openTime} - {court.closeTime}
                  </div>
                  <div className="text-primary small">{court.type}</div>
                  <Card.Title className="mb-1">{court.name}</Card.Title>
                  <div className="text-muted small">
                    <FaMapMarkerAlt className="text-danger me-1" />
                    {court.address.split(',').slice(-2, -1)[0].trim()}
                  </div>
                  <div className="text-muted small mt-1">
                    <FaStar className="text-warning ms-2 me-1" />
                    {court.rating.toFixed(1)}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>

      {/* Modal chi tiết sân */}
      <Modal
        show={showDetail}
        onHide={() => setShowDetail(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedCourt?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="info" id="court-detail-tabs" className="mb-3 border-bottom">
            <Tab eventKey="info" title="Thông tin">
              <div className="tab-scroll">
                <img
                  src={selectedCourt?.images?.[0] || '/default-image.jpg'}
                  alt="court"
                  className="img-fluid rounded mb-3"
                />
                <p><strong>Loại sân:</strong> {selectedCourt?.type}</p>
                <p><strong>Địa chỉ:</strong> {selectedCourt?.address}</p>
                <p><strong>Thời gian mở cửa:</strong> {selectedCourt?.openTime} - {selectedCourt?.closeTime}</p>
                <p><strong>Đánh giá:</strong> ⭐ {selectedCourt?.rating}</p>
              </div>
            </Tab>
            <Tab eventKey="services" title="Dịch vụ">
              <p>Thông tin dịch vụ đi kèm của sân...</p>
            </Tab>
            <Tab eventKey="images" title="Hình ảnh">
              <p>Hình ảnh khác về sân...</p>
            </Tab>
            <Tab eventKey="reviews" title="Đánh giá">
              <p>Hiển thị đánh giá từ người dùng...</p>
            </Tab>
          </Tabs>

          <div className="text-end">
            <Button
              variant="warning"
              style={{ color: "#ffff" }}
              onClick={() =>
                checkLoginAndRedirect(navigate, () => {
                  if (selectedCourt?._id) {
                    navigate(`/booking/${selectedCourt._id}`);
                  } else {
                    toast.error('Không tìm thấy sân để đặt lịch.');
                  }
                })
              }
            >
              Đặt lịch
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default NearbyCourts;
