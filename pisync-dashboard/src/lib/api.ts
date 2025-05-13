import axios from 'axios';

const API = 'http://localhost:5000';

export const fetchDevices = async (page: number, limit: number = 10) => {
  const res = await axios.get(`${API}/devices?page=${page}&limit=${limit}`);
  return res.data;
};

export const triggerSync = async (id: string) => {
  const res = await axios.post(`${API}/sync/${id}`);
  return res.data;
};

export const fetchErrors = async () => {
  const res = await axios.get(`${API}/errors`);
  return res.data.data;
};
