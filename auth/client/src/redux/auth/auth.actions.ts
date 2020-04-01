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
    const response = await axios.get('/authapi/user/me');

    const data = await response.data;

    dispatch({
      type: AuthActionTypes.USER_LOADED,
      payload: data,
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
    dispatch({
      type: AuthActionTypes.REGISTER_SUCCESS,
      payload: data.token,
    });

    loadUser();
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
    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: data.token,
    });
    loadUser();
  } catch (err) {
    console.error(err);
    dispatch({
      type: AuthActionTypes.LOGIN_FAIL,
      payload: err,
    });
  }
};


export const logoutUser = () => {};
