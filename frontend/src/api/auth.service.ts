import api from './axios';

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  role: 'CLIENT' | 'BUSINESS_OWNER';
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  register: async (payload: RegisterPayload) => {
    const { data } = await api.post('/auth/register', payload);
    return data;
  },

  login: async (payload: LoginPayload) => {
    const { data } = await api.post('/auth/login', payload);
    return data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },

  getMe: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },

  refresh: async () => {
    const { data } = await api.post('/auth/refresh');
    return data;
  },
};