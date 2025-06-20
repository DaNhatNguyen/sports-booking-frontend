import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Modal, Tab, Tabs, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCourtsByFilter } from '../services/courtService';
import { Court } from '../types/court';
import { toast } from 'react-toastify';
import { checkLoginAndRedirect } from '../utils/auth'; // nếu bạn có
import { getTypeName } from '../utils/getTypeName';

const CourtByTypePage: React.FC = () => {
    const { type } = useParams<{ type: string }>();
    const navigate = useNavigate();
    const [courts, setCourts] = useState<Court[]>([]);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);

    const location = JSON.parse(localStorage.getItem('selectedLocation') || '{}');
    const { province, district } = location;

    useEffect(() => {
        const fetchCourtsFilter = async () => {
            try {


                if (!type || !province?.name || !district) {
                    console.warn('Thiếu thông tin bộ lọc.');
                    return;
                }

                const data = await getCourtsByFilter(type, province.name, district);
                setCourts(data);
            } catch (err) {
                console.error('Lỗi khi gọi API sân:', err);
            }
        };

        fetchCourtsFilter();

        const handleLocationChange = () => {
            fetchCourtsFilter();
        };

        window.addEventListener('locationChanged', handleLocationChange);
        return () => window.removeEventListener('locationChanged', handleLocationChange);
    }, [type]);


    return (
        <>
            <Header />

            <div className="container mt-4">
                <h2 className="text-xl fw-bold mb-3">
                    Các sân {getTypeName(type)} tại {district}
                </h2>

                <div className="d-flex flex-wrap gap-4 justify-content-start">
                    {courts.length === 0 ? (
                        <div className="text-muted fst-italic px-2">
                            Không có sân nào phù hợp với khu vực đã chọn hoặc chưa có dữ liệu.
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
                                            <FaStar className="text-warning me-1" />
                                            {court.rating.toFixed(1)}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    )}
                </div>
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
                            style={{ color: "#fff" }}
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

            {/* <Footer /> */}
        </>
    );
};

export default CourtByTypePage;