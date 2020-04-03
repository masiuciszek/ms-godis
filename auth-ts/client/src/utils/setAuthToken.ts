/* eslint-disable dot-notation */
import axios from 'axios';

const setAuthToken = (token: string) => {
  if (token) {
    // console.log('axios.defaults  ', axios.defaults.headers.common['Authorization'] = token);
    axios.defaults.headers.common['Authorization'] = token;
    // console.log('TOKEN !!!', token);
  } else {
    // delete token if no passed token
    // delete axios.defaults.common['Authorization'];
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
