// frontend/src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - backend might be down');
    }
    if (!error.response) {
      console.error('Network error - is the backend running?');
    }
    return Promise.reject(error);
  }
);

export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (category) => api.get(`/products/category/${category}`),
  search: (query) => api.get(`/products/search?q=${query}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`)
};

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile')
};

export const cartService = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity) => api.post('/cart/add', { productId, quantity }),
  removeFromCart: (productId) => api.delete(`/cart/remove/${productId}`),
  updateQuantity: (productId, quantity) => api.put('/cart/update', { productId, quantity })
};

export const recommendationService = {
  getUserRecommendations: (userId) => api.get(`/recommendations/user/${userId}`),
  getProductRecommendations: (productId) => api.get(`/recommendations/product/${productId}`),
  getSimilarProducts: (productId) => api.get(`/recommendations/product/${productId}/similar`)
};

export default api;