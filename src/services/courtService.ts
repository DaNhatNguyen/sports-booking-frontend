import axios from 'axios';
import { CourtGroup } from '../types/courtGroup';
import { FilterParams } from '../types/filterParams';

// const API_BASE = process.env.REACT_APP_API_URL;
// console.log("API_BASE:", API_BASE);
// console.log("Toàn bộ env:", process.env);
const API_BASE = 'http://localhost:5000/api';

export const getCourtGroupsByLocation = async (province: string, district: string): Promise<CourtGroup[]> => {
  const res = await axios.get(`${API_BASE}/courts/nearby`, {
    params: { province, district },
  });
  return res.data;
};

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
