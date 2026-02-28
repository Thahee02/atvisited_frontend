import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: true,

    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            set({ user: response.data, isAuthenticated: true, loading: false });
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    register: async (data) => {
        try {
            await api.post('/auth/register', data);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await api.post('/auth/logout');
            set({ user: null, isAuthenticated: false, loading: false });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    },

    checkAuth: async () => {
        try {
            const response = await api.get('/auth/me');
            set({ user: response.data, isAuthenticated: true, loading: false });
        } catch (error) {
            set({ user: null, isAuthenticated: false, loading: false });
        }
    }
}));

export default useAuthStore;
