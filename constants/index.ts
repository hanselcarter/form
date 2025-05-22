// constants/index.ts
// Use this file to store global constants for your project.

export const API_BASE_URL =
  "https://htj12xr882.execute-api.us-east-2.amazonaws.com/prod";
export const APP_NAME = "Form";
export const AUTHOR_NAME = "Rijad Dizdarevic";

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  PROFILE: `${API_BASE_URL}/auth/profile`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
};

// Local storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "ridley_access_token",
  REFRESH_TOKEN: "ridley_refresh_token",
  USER: "ridley_user",
};

// Add more constants as needed below.
