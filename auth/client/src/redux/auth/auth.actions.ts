/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import axios from 'axios';
import { Dispatch } from 'react';
import Cookies from 'js-cookie';
import {
  IRegisterAction, AuthActionTypes, IRegisterFail, IFormData, ILoginSuccess, ILoginFail, IUserLoadedAction, IAuthErrorAction,
} from './auth.types';
import setAuthToken from '../../utils/setAuthToken';


export const loadUser = () => async (dispatch: Dispatch< IUserLoadedAction| IAuthErrorAction >) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    // const response = await axios.get('/authapi/user/me', {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.token}`,
    //   },
    // });

    // const data = await response.data;
    // console.log('load user data', data);
    const res = await fetch('/authapi/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const data = await res.json();
    // TODO : DELETE!
    console.log('USER LOADED', data);
    dispatch({
      type: AuthActionTypes.USER_LOADED,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: AuthActionTypes.AUTH_ERROR,
    });
  }
};


export const registerUser = (
  formData: IFormData,
) => async (dispatch: Dispatch<IRegisterAction|IRegisterFail>) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.post('/authapi/user/register', formData, config);
    const data = await response.data;


    loadUser();
    dispatch({
      type: AuthActionTypes.REGISTER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: AuthActionTypes.REGISTER_FAIL,
      payload: err,
    });
  }
};


export const loginUser = (
  formData: IFormData,
) => async (dispatch: Dispatch<ILoginSuccess|ILoginFail>) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.post('/authapi/auth/login', formData, config);
    const data = await response.data;
    loadUser();
    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: AuthActionTypes.LOGIN_FAIL,
      payload: err,
    });
  }
};


export const logoutUser = () => {};
