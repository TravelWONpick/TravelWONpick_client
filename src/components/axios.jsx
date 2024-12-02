// src/components/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache', // 캐시 비활성화
        Pragma: 'no-cache', // HTTP 1.0 캐시 비활성화
    }
});

export default api;