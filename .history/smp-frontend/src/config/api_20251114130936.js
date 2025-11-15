// API Configuration
export const API_BASE_URL = 'http://localhost:8082';

export const API_ENDPOINTS = {
  LOGIN: '/users/login',
  SIGNUP: '/users/signup',
};

// Full API URLs
export const API_URLS = {
  LOGIN: `${API_BASE_URL}${API_ENDPOINTS.LOGIN}`,
  SIGNUP: `${API_BASE_URL}${API_ENDPOINTS.SIGNUP}`,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_EMAIL: 'userEmail',
};
