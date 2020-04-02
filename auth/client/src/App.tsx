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
import Layout from './components/layout/Layout';


let token: any;
if (Cookie.get('token')) {
  token = Cookie.get('token');
  setAuthToken(token);
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Layout>
      </Switch>
    </div>
  );
}

export default App;
