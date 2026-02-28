import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Response Interceptor for handling errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthenticated - could trigger logout or redirect
            // For now, let's just let the UI handle it via the store status
        }
        return Promise.reject(error);
    }
);

export default api;
