// import axios from 'axios';

export const ENDPOINTS = {
    ApiBaseUrl:'https://api.openweathermap.org/data/2.5/weather?q=',
    WeatherKey:'4597602768fd846dd24850ee4afc700d'
}


export const PORTFOLIOPOINTS = {
    ApiBaseUrl:'https://sptech-api-v1.onrender.com/api/v1/',
    // ApiBaseUrl:'http://localhost:8000/api/v1/'

}

// export const api = axios.create({
//   baseURL: 'https://api.example.com',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;
