import axios from 'axios'

const key = import.meta.env.VITE_API_KEY;

const api = axios;
api.interceptors.request.use(config => {
    if (!config.params) {
        config.params = {};
    }
    config.params.key = key;
    return config;
}, error => {
    return Promise.reject(error);
});
export default api;