import axios from 'axios';
import { logout } from '../utils/auth';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access");

        const authEndpoints = [
            "/token/",
            "/admin/token/",
        ];

        if (
            accessToken &&
            !authEndpoints.some((endpoint) =>
                config.url?.includes(endpoint)
            )
        ) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


api.interceptors.response.use(
    (response) => {
        return response
    }, async(error) => {

        if(!error.config) {
            return Promise.reject(error);
        }

        const originalRequest = error.config;

        if (
            originalRequest.url === '/token/' ||
            originalRequest.url === '/admin/token/' ||
            originalRequest.url === '/token/refresh/'
        ) {
            return Promise.reject(error);
        }

        if(error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh');

                if (!refreshToken) {
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    logout();
                    return Promise.reject(error);
                    
                }

                const response = await axios.post(`${import.meta.env.VITE_API_URL}/token/refresh/`, {
                refresh: refreshToken,
            });

            const {refresh, access} = response.data;

            localStorage.setItem("access", access);

            if (refresh) {
                localStorage.setItem("refresh", refresh);
            }

            originalRequest.headers.Authorization = `Bearer ${access}`;

            return api(originalRequest);
            
            } catch (refreshError) {
                console.log(refreshError);
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                return Promise.reject(refreshError);
            }
            //we can't use api.post() because it has the request interceptor in it and we won't be needing an authorization header 
        }

        return Promise.reject(error);
    }
)


export default api;