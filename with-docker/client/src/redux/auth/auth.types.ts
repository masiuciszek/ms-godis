/* eslint-disable @typescript-eslint/interface-name-prefix */

export interface IUser{
  username: string;
  password: string;
}

export interface IUserData {
  _id: string;
  createdAt: string;
  password: string;
  role: string;
  sessionTokens: IToken[];
  username: string;
  godisDbId: number;
}


export interface IFormData {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  adress?: string;
}

export interface IToken {
  token? : string | undefined;
}

export interface IAuthState{
  token: string | null | undefined;
  loading: boolean;
  isAuth: boolean;
  user: null | IUserData;
  isAdmin: boolean;
  error: null | Record<string, any>;
}


export enum AuthActionTypes {
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAIL = 'REGISTER_FAIL',
  USER_LOADED = 'USER_LOADED',
  AUTH_ERROR = 'AUTH_ERROR',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGOUT = 'LOGOUT',
  IS_ADMIN = 'IS_ADMIN'
}


export interface IRegisterAction {
  type: AuthActionTypes.REGISTER_SUCCESS;
  payload: Record<string, any>;
  // {success:true, token:'asdasdasda21212sa21das} from the server-side
}

export interface IRegisterFail {
  type: AuthActionTypes.REGISTER_FAIL;
  payload: Record<string, any>;
}

export interface ILoginSuccess {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: Record<string, any>;
  // {success:true, token:'asdasdasda21212sa21das} from the server-side
}

export interface ILoginFail {
  type: AuthActionTypes.LOGIN_FAIL;
  payload: Record<string, any>;
}

export interface IUserLoadedAction {
  type: AuthActionTypes.USER_LOADED;
  payload: IUserData;
}

export interface IAuthErrorAction {
  type: AuthActionTypes.AUTH_ERROR;
}

export interface IIsAdminAction {
  type: AuthActionTypes.IS_ADMIN;
  payload: boolean;
}

export interface IAuthLogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export type AuthTypesReducer =
   IRegisterAction
   | IRegisterFail
   | ILoginSuccess
   | ILoginFail
   | IUserLoadedAction
   | IAuthErrorAction
   | IIsAdminAction
   | IAuthLogoutAction
