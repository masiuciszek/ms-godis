/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
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

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  React.useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);


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

  // test();

  console.log(localStorage.token);
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
