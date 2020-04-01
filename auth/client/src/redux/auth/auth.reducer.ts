import { IAuthState, AuthTypesReducer, AuthActionTypes } from './auth.types';


const initialState: IAuthState = {
  token: null,
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
      return {
        ...state,
        token: action.payload,
        isAuth: true,
        loading: false,
      };
    default:
      return state;
  }
};
