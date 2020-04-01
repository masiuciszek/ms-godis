import axios from 'axios';

const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    // delete token if no passed token
    delete axios.defaults.common.Authorization;
  }
};

export default setAuthToken;
