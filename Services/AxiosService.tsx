import axios from 'axios';
import { store } from '../Redux/app';
import { X_API_KEY } from "@env"

const api = axios.create({
  baseURL: 'https://api.poplook.com/api/',
});

api.interceptors.request.use(
  (config) => {

    const state: any = store.getState();
    const token = state.session.token; 
    const id_customer = state.session.user ? state.session.user.id_customer : '' ;

    const params = new URLSearchParams();

    params.append('id_customer', id_customer);

    config.url += `?${params.toString()}`;

    config.headers['X-API-Key'] = X_API_KEY;
    config.headers['Accept'] = 'application/json';

    if (token) {
      config.headers['Authorization']  = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // You can handle successful responses here
    return response;
  },
  (error) => {
    return error.response;
    // return Promise.reject(error.response.data);
  }
);

export default api;