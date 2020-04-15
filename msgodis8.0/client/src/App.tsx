/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React from 'react';
import './App.css';
import Cookie from 'js-cookie';
import { connect } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import Layout from './components/layout/Layout';
import { AppState } from './redux';
import { loadUser } from './redux/auth/auth.actions';
import Router from './components/routes/Routes';


let token: any;
if (Cookie.get('token')) {
  token = Cookie.get('token');
  setAuthToken(token);
}

interface Props {
  token: any;
  loadUser: () => void;
}

const App: React.FC <Props> = ({ token, loadUser }) => {
  React.useEffect(() => {
    if (!token) {
      console.log('no token');
    } else {
      loadUser();
    }
  }, [loadUser, token]);


  return (
    <div className="App">
      <Layout>
        <div className="container">
          <Router />
        </div>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  token: state.auth.token,
});


export default connect(mapStateToProps, { loadUser })(App);
