import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor for logging
API.interceptors.request.use(request => {
    console.log('Starting Request:', request.method, request.url);
    return request;
});

// Response interceptor for error handling
API.interceptors.response.use(
    response => {
        console.log('Response:', response.status);
        return response;
    },
    error => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default API;
