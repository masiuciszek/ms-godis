/* eslint-disable import/extensions */
/* eslint-disable no-undef */

import {
  IProducerState, ProducerActionTypes, ProducerTypesReducer, IProduct,
} from './producer.types';

const initialState: IProducerState = {
  loading: true,
  error: null,
  products: [],
  current: null,
};

export default (state: IProducerState = initialState, action: ProducerTypesReducer) => {
  switch (action.type) {
    case ProducerActionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
      };
    case ProducerActionTypes.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case ProducerActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product: IProduct) => product.id !== action.payload),
        loading: false,
      };
    case ProducerActionTypes.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ProducerActionTypes.CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    default:
      return state;
  }
};
