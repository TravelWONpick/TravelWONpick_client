// src/components/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// 요청 인터셉터를 통해 토큰 추가
api.interceptors.request.use(
    (config) => {
      // 세션 스토리지에서 accessToken 가져오기
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        // Authorization 헤더에 토큰 추가
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

export default api;