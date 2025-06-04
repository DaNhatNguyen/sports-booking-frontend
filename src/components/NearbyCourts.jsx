import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, Tabs, Tab, Button, Badge } from 'react-bootstrap';
import { FaMapMarkerAlt, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const mockData = [
    {
        id: 1,
        name: 'Sân bóng La Thành',
        sport: 'Sân bóng đá',
        location: 'Quận Thanh Xuân',
        distance: '0.0 km',
        rating: 0,
        image: require('../assets/slide/slide1.png'),
    },
    {
        id: 2,
        name: 'Sân bóng đá Viettel 2',
        sport: 'Sân bóng đá',
        location: 'Quận Thanh Xuân',
        distance: '0.0 km',
        rating: 0,
        image: require('../assets/slide/slide1.png'),
    },
    {
        id: 3,
        name: 'Sân bóng Đầm Hồng 2',
        sport: 'Sân bóng đá',
        location: 'Quận Thanh Xuân',
        distance: '0.0 km',
        rating: 0,
        image: require('../assets/slide/slide1.png'),
    },
    {
        id: 4,
        name: 'Sân bóng Đầm Hồng 1',
        sport: 'Sân bóng đá',
        location: 'Quận Thanh Xuân',
        distance: '0.0 km',
        rating: 0,
        image: require('../assets/slide/slide1.png'),
    },
    {
        id: 5,
        name: 'Sân bóng Đầm Hồng 1',
        sport: 'Sân bóng đá',
        location: 'Quận Thanh Xuân',
        distance: '0.0 km',
        rating: 0,
        image: require('../assets/slide/slide1.png'),
    },
    {
        id: 6,
        name: 'Sân bóng Đầm Hồng 1',
        sport: 'Sân bóng đá',
        location: 'Quận Thanh Xuân',
        distance: '0.0 km',
        rating: 0,
        image: require('../assets/slide/slide1.png'),
    },
    {
        id: 7,
        name: 'Sân bóng Đầm Hồng 1',
        sport: 'Sân bóng đá',
        location: 'Quận Thanh Xuân',
        distance: '0.0 km',
        rating: 0,
        image: require('../assets/slide/slide1.png'),
    },
    {
        id: 8,
        name: 'Sân bóng Đầm Hồng 1',
        sport: 'Sân bóng đá',
        location: 'Quận Thanh Xuân',
        distance: '0.0 km',
        rating: 0,
        image: require('../assets/slide/slide1.png'),
    }
];

const NearbyCourts = () => {

    const [selectedCourt, setSelectedCourt] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    return (
        <Container className="my-5">
            <h4 className="fw-bold">Sân tập gần bạn</h4>
            <p className="text-muted">Khu vực được đề xuất gần vị trí của bạn</p>

            {/* Bộ lọc */}
            <div className="d-flex gap-2 flex-wrap mb-4">
                <Badge pill bg="dark" text="light">Tất cả</Badge>
                <Badge pill bg="light" text="dark" className="border">Bóng đá</Badge>
                <Badge pill bg="light" text="dark" className="border">Tennis</Badge>
                <Badge pill bg="light" text="dark" className="border">Cầu lông</Badge>
                <Badge pill bg="light" text="dark" className="border">Bóng bàn</Badge>
            </div>

            {/* Danh sách sân */}
            <div className="d-flex flex-wrap gap-4 justify-content-start">
                {mockData.map((court) => (
                    <div
                        key={court.id}
                        className="shadow-sm bg-white rounded"
                        style={{
                            flex: '1 1 calc(25% - 1rem)', // 4 sân mỗi dòng (trên desktop)
                            minWidth: '260px',            // giới hạn chiều rộng tối thiểu
                            maxWidth: '300px'             // không quá to
                        }}
                        onClick={() => {
                            setSelectedCourt(court);
                            setShowDetail(true);
                        }}
                    >
                        <Card className="h-100 border-0">
                            <Card.Img
                                variant="top"
                                src={court.image}
                                style={{ height: '160px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <div className="text-muted small mb-1">Mở cửa: 05:00 - 22:00</div>
                                <div className="text-primary small">{court.sport}</div>
                                <Card.Title className="mb-1">{court.name}</Card.Title>
                                <div className="text-muted small">
                                    <FaMapMarkerAlt className="text-danger me-1" />
                                    {court.location}
                                </div>
                                <div className="text-muted small mt-1">
                                    Cách {court.distance}{' '}
                                    <FaStar className="text-warning ms-2 me-1" />
                                    {court.rating}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
                {/* Overlay chi tiết sân */}
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
                                        src={selectedCourt?.image}
                                        alt="court"
                                        className="img-fluid rounded mb-3"
                                    />
                                    <p><strong>Loại sân:</strong> {selectedCourt?.sport}</p>
                                    <p><strong>Địa chỉ:</strong> {selectedCourt?.location}</p>
                                    <p><strong>Thời gian mở cửa:</strong> 05:00 - 22:00</p>
                                    <p><strong>Khoảng cách:</strong> {selectedCourt?.distance}</p>
                                    <p><strong>Đánh giá:</strong> ⭐ {selectedCourt?.rating}</p>
                                </div>

                            </Tab>

                            <Tab eventKey="services" title="Dịch vụ">
                                <div className="tab-scroll">
                                    <p>Thông tin dịch vụ đi kèm của sân...</p>
                                </div>

                            </Tab>

                            <Tab eventKey="images" title="Hình ảnh">
                                <div className="tab-scroll">
                                    <p>Hình ảnh khác về sân...</p>
                                </div>

                            </Tab>

                            <Tab eventKey="reviews" title="Đánh giá">
                                <div className="tab-scroll">
                                    <p>Hiển thị đánh giá từ người dùng...</p>
                                </div>

                            </Tab>
                        </Tabs>

                        <div className="text-end">
                            <Button
                                variant="warning"
                                href={selectedCourt?.link || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Đặt sân
                            </Button>
                        </div>
                    </Modal.Body>

                </Modal>
            </div>
        </Container>
    );
};

export default NearbyCourts;
