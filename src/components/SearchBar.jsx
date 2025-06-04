import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFutbol, FaMapMarkerAlt } from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';

const SearchBar = () => {
    return (
        <div className="bg-white py-4" style={{
            position: 'absolute',
            top: '75%',             
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
                                <option><FaFutbol /> Chọn môn thể thao</option>
                                <option>Bóng đá</option>
                                <option>Tennis</option>
                                <option>Cầu lông</option>
                            </Form.Select>
                        </Col>

                        <Col md={3} sm={6}>
                            <Form.Select>
                                <option><MdLocationCity /> Chọn tỉnh/thành phố</option>
                                <option>Hà Nội</option>
                                <option>TP.HCM</option>
                                <option>Đà Nẵng</option>
                            </Form.Select>
                        </Col>

                        <Col md={3} sm={6}>
                            <Form.Select>
                                <option><FaMapMarkerAlt /> Chọn quận/huyện</option>
                                <option>Thanh Xuân</option>
                                <option>Cầu Giấy</option>
                            </Form.Select>
                        </Col>

                        <Col md={3} sm={6}>
                            <Button variant="danger" type="submit" className="w-100">
                                Tìm kiếm ngay
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default SearchBar;
