import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import { getAvailableTimeSlots, getCourtGroupById, getCourtsByGroupId } from '../services/courtService';
import { Court } from '../types/Court';
import { TimeSlot } from '../types/TimeSlot';
import Header from '../components/Header';


const BookingPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [courtGroup, setCourtGroup] = useState<any>(null);
  const [courts, setCourts] = useState<Court[]>([]);
  const [selectedCourtId, setSelectedCourtId] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Lấy user từ localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Lấy sân lớn theo groupId
  useEffect(() => {
    const fetchCourtGroup = async () => {
      if (groupId) {
        try {
          const data = await getCourtGroupById(groupId);
          setCourtGroup(data);
        } catch (err) {
          console.error('Lỗi lấy sân lớn:', err);
        }
      }
    };

    fetchCourtGroup();
  }, [groupId]);

  // Lấy danh sách sân nhỏ của sân lớn
  useEffect(() => {
    const fetchCourts = async () => {
      if (groupId) {
        try {
          const data = await getCourtsByGroupId(groupId);
          setCourts(data);
        } catch (err) {
          console.error('Lỗi khi load sân nhỏ:', err);
        }
      }
    };

    fetchCourts();
  }, [groupId]);

  // Lấy giờ trống
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (selectedCourtId && selectedDate) {
        try {
          const data = await getAvailableTimeSlots(selectedCourtId, selectedDate);
          setTimeSlots(data);
        } catch (err) {
          console.error('Lỗi khi load giờ trống:', err);
        }
      }
    };

    fetchTimeSlots();
  }, [selectedCourtId, selectedDate]);

  return (
    <>
      <Header />
      <Container className="my-5">
        {/* Thông tin sân */}
        {courtGroup && (
          <>
            <h3 className="fw-bold">{courtGroup.name}</h3>
            <div className="text-muted mb-3">
              <FaMapMarkerAlt className="text-danger me-2" />
              {courtGroup.address}, {courtGroup.district}, {courtGroup.province}
            </div>
          </>
        )}

        {/* Chọn ngày */}
        <Button variant="outline-primary" className="mb-3" onClick={() => setShowDatePicker(true)}>
          <FaCalendarAlt className="me-2" />
          {new Date(selectedDate).toLocaleDateString('vi-VN')}
        </Button>

        <Modal show={showDatePicker} onHide={() => setShowDatePicker(false)} centered>
          <Modal.Body>
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDatePicker(false)}>
              Hủy
            </Button>
            <Button variant="success" onClick={() => setShowDatePicker(false)}>
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Form chọn sân nhỏ */}
        <Form>
          <Row className="g-2 align-items-center mb-4">
            <Col md={6} sm={12}>
              <Form.Select
                value={selectedCourtId}
                onChange={(e) => setSelectedCourtId(e.target.value)}
              >
                <option value="">Chọn sân nhỏ</option>
                {courts.map((court) => (
                  <option key={court._id} value={court._id}>
                    {court.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Form>

        {/* Giờ trống */}
        {selectedCourtId && (
          <>
            <h5 className="fw-bold">Khung giờ khả dụng:</h5>
            {timeSlots.length === 0 ? (
              <p className="text-muted">Không còn khung giờ trống cho ngày này.</p>
            ) : (
              <Row className="g-2">
                {timeSlots.map((slot) => (
                  <Col key={slot._id} md={3} sm={6}>
                    <div
                      className="border p-2 rounded text-center bg-light cursor-pointer hover:bg-primary hover:text-white"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedSlot(slot);
                        setShowConfirmModal(true);
                      }}
                    >
                      {slot.startTime} - {slot.endTime}
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}

        {/* Xác nhận đặt lịch */}
        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận thông tin đặt sân</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {courtGroup && selectedSlot && (
              <>
                <h5 className="fw-bold">Thông tin sân:</h5>
                <p>Tên:<strong> {courtGroup.name}</strong></p>
                <p>Địa chỉ:<strong> {courtGroup.address}, {courtGroup.district}, {courtGroup.province}</strong></p>
                <p>Điện thoại:<strong> {courtGroup.phoneNumber || 'Không có'}</strong></p>

                <h5 className="fw-bold mt-3">Thông tin lịch đặt:</h5>
                <p>Ngày đặt:<strong> {new Date(selectedDate).toLocaleDateString('vi-VN')}</strong></p>
                <p><strong>{courts.find(c => c._id === selectedCourtId)?.name}: {selectedSlot.startTime} - {selectedSlot.endTime}</strong></p>
                <p>Đối tượng:<strong> {courtGroup.type}</strong></p>
                <p>Tổng giờ:<strong> 1h</strong></p>
                <p>Tổng tiền:<strong> {courts.find(c => c._id === selectedCourtId)?.pricePerHour?.toLocaleString()}đ</strong></p>

                <h5 className="fw-bold mt-3">Thông tin người dùng:</h5>
                <p>Họ tên:<strong> {user.fullName}</strong></p>
                <p>Số điện thoại:<strong> {user.phoneNumber}</strong></p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Hủy</Button>
            <Button variant="primary">Xác nhận đặt sân</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default BookingPage;