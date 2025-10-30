const DEFAULT_BASE_URL = 'http://192.168.4.12:3000';

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL?.trim() || DEFAULT_BASE_URL;
