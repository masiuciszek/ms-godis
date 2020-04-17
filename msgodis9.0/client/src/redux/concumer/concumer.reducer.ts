/* eslint-disable import/extensions */
import { IConsumerState, ConsumerReducerType, ConsumerActionTypes } from './consumer.types';

const initialState: IConsumerState = {
  loading: false,
  consumer: null,
  currentUser: null,
  error: null,
  orders: [],
};

export default (state: IConsumerState = initialState, action: ConsumerReducerType) => {
  switch (action.type) {
    case ConsumerActionTypes.GET_MY_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case ConsumerActionTypes.DELETE_MY_ORDERS:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
        loading: false,
      };
    case ConsumerActionTypes.EDIT_MY_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        loading: false,
      };
    default:
      return state;
  }
};
