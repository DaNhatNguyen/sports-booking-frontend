import axios from 'axios';
import { Booking } from '../types/Booking';

const API_BASE = process.env.REACT_APP_API_URL;

interface TimeSlotInput {
    startTime: string;
    endTime: string;
}

interface CreateBookingPayload {
    courtId: string;
    date: string;
    userId: string;
    timeSlot: TimeSlotInput;
}

// Tạo mới booking
export const createBooking = async (
    data: CreateBookingPayload
): Promise<Booking> => {
    const res = await axios.post(`${API_BASE}/bookings`, data);
    return res.data.booking;
};