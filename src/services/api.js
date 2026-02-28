import axios from 'axios';

export const baseURL = import.meta.env.VITE_API_BASE_URL;
// Ensure serverURL ends with exactly one slash
const baseServer = baseURL.replace(/\/api\/v1\/?$/, '');
export const serverURL = baseServer.endsWith('/') ? baseServer : baseServer + '/';

const api = axios.create({
    baseURL,
    withCredentials: true
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

export const getFullImageUrl = (path, defaultUrl = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80') => {
    if (!path) return defaultUrl;
    if (path.startsWith('http') || path.startsWith('//')) return path;

    // Ensure path starts without a slash to avoid double slashes with serverURL
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${serverURL}${cleanPath}`;
};

export default api;
