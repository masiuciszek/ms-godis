/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React from 'react';
import './App.css';
import axios from 'axios';
import Cookie from 'js-cookie';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';

interface IFormData {
  username: string;
  password: string;
}

interface IToken {
  token? : string | undefined;
}

let token: any;
if (Cookie.get('token')) {
  token = Cookie.get('token');
  setAuthToken(token);
}

console.log('token', Cookie.get('token'));

function App() {
  const [formData, setFormData] = React.useState<IFormData>({
    username: '',
    password: '',
  });
  const [isAuth, setisAuth] = React.useState<boolean>(false);
  const [isToken, setIsToken] = React.useState<IToken>({});

  const register = async (formData: IFormData): Promise<any> => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/authapi/user/register', formData, config);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const getCookies = async () => {
    try {
      const res = await axios.get('/goidisapi/company', { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODQ2YWEyZmQ2Yjk3NThjNDMxNTI1MiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTg1NzM2MzU0LCJleHAiOjE1ODgzMjgzNTR9.EaZ8zeeh5_PtJZb1hkuEXRjckSzVTdwy7xjDTrArK8U' } });
      const resBody = await res.data;
      setIsToken(resBody);
      console.log(resBody);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData);
    setFormData({
      username: '',
      password: '',
    });
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="App">

      <h1>Register</h1>
      <Register />

      <h1>Login</h1>
      <Login />
    </div>
  );
}

export default App;
{ /* <div className="App">
<h3>{isToken && isToken.token ? 'Welcome Logged in user' : 'not logged in'}</h3>
<form onSubmit={handleSubmit}>
  <label htmlFor="username">
    <span>Username</span>
    <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleChange} />
  </label>

  <label htmlFor="password">
    <span>Password</span>
    <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} />
  </label>

  <button type="submit">Register</button>
</form>
<button type="button" onClick={getCookies}>Get cookie</button>
</div> */ }
