import axios from 'axios';
import { Court } from '../types/court';
import { FilterParams } from '../types/filterParams';

// const API_BASE = process.env.REACT_APP_API_URL;
// console.log("API_BASE:", API_BASE);
// console.log("Toàn bộ env:", process.env);
const API_BASE = 'http://localhost:5000/api';

export const getCourtsByLocation = async (province: string, district: string): Promise<Court[]> => {
  const res = await axios.get(`${API_BASE}/courts/nearby`, {
    params: { province, district },
  });
  return res.data;
};

export const searchCourts = async (
  type: string,
  city: string,
  district: string
): Promise<Court[]> => {
  const response = await axios.get(`${API_BASE}/courts/search`, {
    params: { type, city, district },
  });
  return response.data;
};

export const getCourtsByFilter = async (
  type: string,
  city: string,
  district: string
): Promise<Court[]> => {
  const response = await axios.get(`${API_BASE}/courts/filter`, {
    params: { type, city, district },
  });
  return response.data;
};
