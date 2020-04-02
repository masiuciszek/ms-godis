/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Cookie from 'js-cookie';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';
import Home from './components/home/Home';

interface IFormData {
  username: string;
  password: string;
}

interface IToken {
  token? : string | undefined;
}

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }
let token: any;
if (Cookie.get('token')) {
  token = Cookie.get('token');
  setAuthToken(token);
}

function App() {
  const test = async () => {
    const res = await fetch('/authapi/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const data = await res.json();
    console.log(data.data);
  };

  const test2 = () => {
    const x = Cookie.get('token');
    console.log('Cookie  ', x);
  };

  // console.log(test2());


  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
