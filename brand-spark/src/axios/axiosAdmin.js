import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import { store } from '../redux/store';
import { adminLogout } from '../redux/slices/adminSlice';

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    console.log('Decoded token:', decodedToken);
    return decodedToken.exp !== undefined ? decodedToken.exp < currentTime : true;
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return true;
  }
};

export const axiosAdmin = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        if (isTokenExpired(token)) {
          console.log('Token has expired');
          store.dispatch(adminLogout());
        } else {
          console.log('Token is valid');
          config.headers.Authorization = `Bearer ${token}`;
        }
      } else {
        console.log('No token found');
      }
      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('Response received:', response);
      return response;
    },
    (error) => {
      console.error('Response error:', error.response || error.message);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
