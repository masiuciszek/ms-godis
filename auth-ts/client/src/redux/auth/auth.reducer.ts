/* eslint-disable no-undef */
import Cookie from 'js-cookie';
import { IAuthState, AuthTypesReducer, AuthActionTypes } from './auth.types';

const initialState: IAuthState = {
  token: Cookie.get('token'),
  loading: true,
  isAuth: false,
  isAdmin: false,
  user: null,
  error: null,

};

export default (state: IAuthState = initialState, action: AuthTypesReducer) => {
  switch (action.type) {
    case AuthActionTypes.USER_LOADED:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        loading: false,
      };
    case AuthActionTypes.REGISTER_SUCCESS:
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
      };

    case AuthActionTypes.REGISTER_FAIL:
    case AuthActionTypes.LOGOUT:
      Cookie.remove('token');
      return {
        ...state,
        isAuth: false,
        loading: false,
        isAdmin: false,
        user: null,
      };
    case AuthActionTypes.IS_ADMIN:
      return {
        ...state,
        loading: false,
        isAdmin: action.payload,
      };
    default:
      return state;
  }
};
