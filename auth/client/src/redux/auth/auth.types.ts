/* eslint-disable @typescript-eslint/interface-name-prefix */

export interface IUser{
  username: string;
  password: string;
}


export interface IFormData {
  username: string;
  password: string;
}

export interface IToken {
  token? : string | undefined;
}

export interface IAuthState{
  token: string | null | undefined;
  loading: boolean;
  isAuth: boolean;
  user: null | IUser;
  error: null | Record<string, any>;
}


export enum AuthActionTypes {
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAIL = 'REGISTER_FAIL',
  USER_LOADED = 'USER_LOADED',
  AUTH_ERROR = 'AUTH_ERROR',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGOUT = 'LOGOUT'
}


export interface IRegisterAction {
  type: AuthActionTypes.REGISTER_SUCCESS;
  payload: string; // token
}

export interface IRegisterFail {
  type: AuthActionTypes.REGISTER_FAIL;
  payload: Record<string, any>;
}

export interface ILoginSuccess {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: string; // token
}

export interface ILoginFail {
  type: AuthActionTypes.LOGIN_FAIL;
  payload: Record<string, any>;
}

export interface IUserLoadedAction {
  type: AuthActionTypes.USER_LOADED;
  payload: IUser;
}

export interface IAuthErrorAction {
  type: AuthActionTypes.AUTH_ERROR;
}

export type AuthTypesReducer =
   IRegisterAction
   | IRegisterFail
   | ILoginSuccess
   | ILoginFail
   | IUserLoadedAction
   | IAuthErrorAction
