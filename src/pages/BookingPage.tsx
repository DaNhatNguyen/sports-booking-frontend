// src/pages/BookingPage.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookingSchedule from '../components/BookingSchedule';

interface TimeSlotStatus {
  time: string;
  status: 'empty' | 'booked' | 'locked' | 'event';
}

interface CourtSchedule {
  courtName: string;
  slots: TimeSlotStatus[];
}

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const courtId = searchParams.get('courtId');
  const date = searchParams.get('date');
  const [data, setData] = useState<CourtSchedule[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch(
          `/api/bookings?specificDate=${date}&courtId=${courtId}`
        );
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };
    if (courtId && date) fetchSchedule();
  }, [courtId, date]);

  return (
    <div>
      <h3>Lịch đặt sân</h3>
      <BookingSchedule data={data} selectedDate={date || ''} />
    </div>
  );
};

export default BookingPage;
