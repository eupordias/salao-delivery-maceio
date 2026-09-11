import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
});

api.interceptors.request.use((config) => {
  // In a real app, get token from cookies or localStorage
  const token = 'mock-token';
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized');
    }
    return Promise.reject(error);
  }
);

// Mocks for now
export const inventoryApi = {
  list: async () => [],
  create: async (data: any) => data,
  update: async (id: string, data: any) => data,
  delete: async (id: string) => true,
  listMovements: async () => [],
  adjustStock: async (data: any) => data,
};

export const financialApi = {
  getCashFlow: async () => [],
  getReports: async () => ({}),
  getMetrics: async () => ({}),
  createTransaction: async (data: any) => data,
};

export const crmApi = {
  getInactiveClients: async () => [],
  getVipClients: async () => [],
  createCampaign: async (data: any) => data,
  listCampaigns: async () => [],
  triggerCampaign: async (id: string) => true,
  exportCsv: async () => true,
};

export default api;
