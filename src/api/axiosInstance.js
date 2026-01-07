import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_N8N_API_URL || 'http://localhost:5678/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  logout: () => axiosInstance.post('/auth/logout'),
  getCurrentUser: () => axiosInstance.get('/auth/me'),
};

export const workflowAPI = {
  getAll: () => axiosInstance.get('/workflows'),
  getById: (id) => axiosInstance.get(`/workflows/${id}`),
  execute: (id, data) => axiosInstance.post(`/workflows/${id}/execute`, data),
  getExecutions: (workflowId) => axiosInstance.get(`/workflows/${workflowId}/executions`),
};

export const executionAPI = {
  getAll: (params) => axiosInstance.get('/executions', { params }),
  getById: (id) => axiosInstance.get(`/executions/${id}`),
  getStats: () => axiosInstance.get('/executions/stats'),
};

export default axiosInstance;
