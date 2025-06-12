import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const getStoredUser = () => {
    const stored = localStorage.getItem('user');
    // console.log(stored)
    return stored ? JSON.parse(stored) : null;
};

export const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const clearUser = () => {
    localStorage.removeItem('user');
};

// Gọi api nhận ủy quyền từ token đã lưu 
export const fetchCurrentUser = async (token) => {

    // console.log('Đang gửi token:', token);
    const res = await axios.get(`${API_BASE}/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data.user;
};
