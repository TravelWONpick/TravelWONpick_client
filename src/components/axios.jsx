// src/components/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}/api` || `http://www.travelwonpick.com/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;