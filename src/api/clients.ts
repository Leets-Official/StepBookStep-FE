import axios from 'axios';

const BASE_URL = import.meta.env.VITE_STEPBOOKSTEP_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request 인터셉터 - 모든 요청에 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
    //   window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
