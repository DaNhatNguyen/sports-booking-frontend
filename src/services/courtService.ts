import axios from 'axios';
import { CourtGroup } from '../types/courtGroup';
import { FilterParams } from '../types/filterParams';
import { Court } from '../types/Court';
import { TimeSlot } from '../types/TimeSlot';

const API_BASE = process.env.REACT_APP_API_URL;
// console.log("API_BASE:", API_BASE);
// console.log("Toàn bộ env:", process.env);
// const API_BASE = 'http://localhost:5000/api';

// Gọi API lấy ra sân gần với địa điểm của user
export const getCourtGroupsByLocation = async (province: string, district: string): Promise<CourtGroup[]> => {
  const res = await axios.get(`${API_BASE}/courts/nearby`, {
    params: { province, district },
  });
  return res.data;
};

// Gọi API tìm ra các sân theo yêu cầu của user
export const searchCourtGroups = async (
  type: string,
  city: string,
  district: string
): Promise<CourtGroup[]> => {
  const response = await axios.get(`${API_BASE}/courts/search`, {
    params: { type, city, district },
  });
  return response.data;
};

// Gọi API lọc ra các sân theo thể loại sân
export const getCourtGroupsByFilter = async (
  type: string,
  city: string,
  district: string
): Promise<CourtGroup[]> => {
  const response = await axios.get(`${API_BASE}/courts/filter`, {
    params: { type, city, district },
  });
  return response.data;
};

// Gọi API lấy ra sân lớn theo id
export const getCourtGroupById = async (groupId: string): Promise<CourtGroup> => {
  const res = await axios.get(`${API_BASE}/courts/${groupId}`);
  return res.data;
};

// Lấy ra sân nhỏ theo sân lớn
export const getCourtsByGroupId = async (groupId: string): Promise<Court[]> => {
  const res = await axios.get(`${API_BASE}/courts`, {
    params: { groupId }
  });
  return res.data;
};

// Lấy thời gian còn trống của sân nhỏ
export const getAvailableTimeSlots = async (
  courtId: string,
  date: string
): Promise<TimeSlot[]> => {
  const res = await axios.get(`${API_BASE}/courts/${courtId}/available-time-slots`, {
    params: { date },
  });
  return res.data;
};
