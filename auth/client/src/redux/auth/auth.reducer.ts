/* eslint-disable no-undef */
import { IAuthState, AuthTypesReducer, AuthActionTypes } from './auth.types';


const initialState: IAuthState = {
  token: localStorage.getItem('token'),
  loading: true,
  isAuth: false,
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

      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
      };
    case AuthActionTypes.REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuth: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
