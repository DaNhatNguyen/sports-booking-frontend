import React from "react";
import './BookingSchedule.css';

interface TimeSlotStatus {
  time: string;
  status: 'empty' | 'booked' | 'locked' | 'event';
}

interface CourtSchedule {
  courtName: string;
  slots: TimeSlotStatus[];
}

interface Props {
  data: CourtSchedule[];
  selectedDate: string;
}

const BookingSchedule: React.FC<Props> = ({ data, selectedDate }) => {
  const timeRange = [
    "5:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00",
    "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
    "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00",
    "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
  ];

  const getColorClass = (status: string) => {
    switch (status) {
      case "booked": return "slot-booked";
      case "locked": return "slot-locked";
      case "event": return "slot-event";
      default: return "slot-empty";
    }
  };

  return (
    <div className="schedule-container">
      <h4>Đặt lịch ngày trực quan - {selectedDate}</h4>
      <div className="table-wrapper">
        <div className="schedule-grid">
          <div className="header-row">
            <div className="header-cell">Sân</div>
            {timeRange.map((time, idx) => (
              <div key={idx} className="header-cell">{time}</div>
            ))}
          </div>
          {data.map((court, idx) => (
            <div key={idx} className="court-row">
              <div className="court-name">{court.courtName}</div>
              {court.slots.map((slot, sIdx) => (
                <div key={sIdx} className={`slot-cell ${getColorClass(slot.status)}`}></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingSchedule;