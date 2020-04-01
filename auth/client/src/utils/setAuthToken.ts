/* eslint-disable dot-notation */
import axios from 'axios';

const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    // delete token if no passed token
    // delete axios.defaults.common['Authorization'];
    delete axios.defaults.headers['Authorization'];
  }
};

export default setAuthToken;
