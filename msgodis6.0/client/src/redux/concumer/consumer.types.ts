/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/interface-name-prefix */


export interface IConsumer {
  id: number;
  firstName: string;
  lastName: string;
  adress: string;
}

export interface IConsumerState{
  loading: boolean;
  consumer: null | IConsumer;
  error: null | Record<string, any>;
  currentUser: null | IConsumer;
}

export enum ConsumerActionTypes {
  GET_USERS = 'GET_USERS',
  LOGIN = 'LOGIN',
  REMOVE_USER = 'REMOVE_USER',
  SET_CURRENT_USER = 'SET_CURRENT_USER',

}


export interface GetUsersAction {
  type: ConsumerActionTypes.GET_USERS;
  payload: IConsumer[];
}

export interface SetCurrentUserAction {
  type: ConsumerActionTypes.SET_CURRENT_USER;
  payload: IConsumer;
}


export type ConsumerReducerType = GetUsersAction | SetCurrentUserAction
