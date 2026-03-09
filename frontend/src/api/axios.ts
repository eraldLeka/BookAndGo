import axios, { type InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryConfig | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${apiBaseUrl}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        const refreshedHeaders = AxiosHeaders.from(originalRequest.headers ?? {});
        refreshedHeaders.set('Authorization', `Bearer ${newAccessToken}`);
        originalRequest.headers = refreshedHeaders;

        return api(originalRequest);
      } catch {
        localStorage.removeItem('accessToken');
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  },
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const headers = AxiosHeaders.from(config.headers ?? {});
    headers.set('Authorization', `Bearer ${token}`);
    config.headers = headers;
  }
  return config;
});

export default api;
