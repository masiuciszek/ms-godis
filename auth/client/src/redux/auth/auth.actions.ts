/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import axios from 'axios';
import { Dispatch } from 'react';
import Cookies from 'js-cookie';
import {
  IRegisterAction, AuthActionTypes, IRegisterFail, IFormData,
  ILoginSuccess, ILoginFail, IUserLoadedAction, IAuthErrorAction, IAuthLogoutAction, IIsAdminAction,
} from './auth.types';
import setAuthToken from '../../utils/setAuthToken';


export const loadUser = () => async (dispatch: Dispatch< IUserLoadedAction| IAuthErrorAction >) => {
  let token: any;
  if (Cookies.get('token')) {
    token = Cookies.get('token');
    setAuthToken(token);
  }
  try {
    const res = await fetch('/authapi/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

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


    dispatch({
      type: AuthActionTypes.REGISTER_SUCCESS,
      payload: data,
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
      payload: data,
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


export const logoutUser = () => async (dispatch: Dispatch<IAuthLogoutAction>) => {
  try {
    await fetch('/authapi/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    dispatch({
      type: AuthActionTypes.LOGOUT,
    });
  } catch (err) {
    console.error(err);
  }
};


export const isAdmin = () => async (dispatch: Dispatch<IIsAdminAction>) => {
  try {
    const response = await fetch('/authapi/auth/isadmin', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    const data = await response.json();

    dispatch({
      type: AuthActionTypes.IS_ADMIN,
      payload: data.response,
    });
  } catch (err) {
    console.error(err);
  }
};
