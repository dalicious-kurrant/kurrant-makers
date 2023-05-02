import axios from 'axios';
import {getToken} from './localStorage';

const token = getToken('token');

const baseURL =
  process.env.REACT_APP_NODE_ENV === 'prod'
    ? process.env.REACT_APP_BASE_URL + '/' + process.env.REACT_APP_API_VERSION
    : process.env.REACT_APP_LOCAL_URL + '/' + process.env.REACT_APP_API_VERSION;

const instance = axios.create({baseURL});

const setToken = config => {
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};

if (token) {
  // console.log(token);
  instance.interceptors.request.use(setToken);
}

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const {response} = error;
    if (response.status === 411 || response.status === 403) {
      localStorage.clear();
      alert('로그인이 만료되어 로그아웃 됩니다.');
      window.location.replace('/');
    }

    return Promise.reject(error);
  },
);

export default instance;
