import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (phone, password) => api.post('/auth/login', { phone, password }),
  register: (name, phone, password) => api.post('/auth/register', { name, phone, password }),
  getAllUsers: () => api.get('/auth/users'),
};

export const categoryAPI = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
};

export const promptAPI = {
  createLesson: (data) => api.post('/prompts/lesson', data),
  getUserLessons: () => api.get('/prompts/lessons'),
  getAllLessons: () => api.get('/prompts/admin/all-lessons'),
};

export default api;