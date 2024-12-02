// // src/components/axios.js
// import axios from 'axios';

// const api = axios.create({
//     baseURL: import.meta.env.VITE_APP_API_URL,
//   });
  
//   api.interceptors.request.use(
//     (config) => {
//       const accessToken = sessionStorage.getItem('accessToken');
//       if (accessToken) {
//         config.headers['Authorization'] = `Bearer ${accessToken}`;
//       }
//       config.headers['Content-Type'] = 'application/json';
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
  

// export default api;


// src/components/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;