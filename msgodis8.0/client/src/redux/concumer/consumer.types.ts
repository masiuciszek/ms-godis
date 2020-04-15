/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/interface-name-prefix */

// import { IOrderProduct } from '../cart/cart.types';

export interface IConsumer {
  id: number;
  firstName: string;
  lastName: string;
  adress: string;
}

export interface IOrderMap {
  id: number;
  created_at: Date;
  total: number;
  orderProduct: [
    {
      id: number;
      created_at: Date;
      qty: number;
      price: number;
      product: {
        id: number;
        created_at: Date;
        name: string;
        qty: number;
        price: number;
      };
    },
  ];
}

export interface IMyOrder {
  message: string;
  orders: IOrderMap[];

}

export interface IConsumerState{
  loading: boolean;
  consumer: null | IConsumer;
  error: null | Record<string, any>;
  currentUser: null | IConsumer;
  orders: Record<string, any>[];
}

export enum ConsumerActionTypes {
  GET_USERS = 'GET_USERS',
  LOGIN = 'LOGIN',
  REMOVE_USER = 'REMOVE_USER',
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  GET_MY_ORDERS = 'GET_MY_ORDERS',
  EDIT_MY_ORDER = 'EDIT_MY_ORDER',
  DELETE_MY_ORDERS = 'DELETE_MY_ORDERS',
}


export interface GetUsersAction {
  type: ConsumerActionTypes.GET_USERS;
  payload: IConsumer[];
}

export interface SetCurrentUserAction {
  type: ConsumerActionTypes.SET_CURRENT_USER;
  payload: IConsumer;
}
export interface IGetMyOrdersAction {
  type: ConsumerActionTypes.GET_MY_ORDERS;
  payload: Record<string, any>[];

}
export interface IEditMyOrderAction {
  type: ConsumerActionTypes.EDIT_MY_ORDER;
  payload: Record<string, any>[]; // IOrderProduct[]

}

export interface IDeleteMyOrderActions {
  type: ConsumerActionTypes.DELETE_MY_ORDERS;
  payload: number; // id
}


export type ConsumerReducerType = GetUsersAction |
SetCurrentUserAction |
IGetMyOrdersAction |
IEditMyOrderAction |
IDeleteMyOrderActions
