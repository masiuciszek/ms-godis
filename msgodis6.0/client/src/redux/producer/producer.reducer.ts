/* eslint-disable import/extensions */
/* eslint-disable no-undef */

import {
  IProducerState, ProducerActionTypes, ProducerTypesReducer,
} from './producer.types';
import { IProduct } from '../shop/shop.types';

const initialState: IProducerState = {
  loading: true,
  error: null,
  products: [],
  current: null,
  currentDeal: null,
  deals: [],
  // productDeals: [],
};

export default (state: IProducerState = initialState, action: ProducerTypesReducer) => {
  switch (action.type) {
    case ProducerActionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
      };
    case ProducerActionTypes.GET_PRODUCTS_BY_PRODUCER:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case ProducerActionTypes.GET_PRODUCER_DEALS:
      return {
        ...state,
        deals: action.payload,
        loading: false,
      };
    case ProducerActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product: IProduct) => product.id !== action.payload),
        loading: false,
      };

    case ProducerActionTypes.CREATE_DEAL:
      return {
        ...state,
        deals: [...state.deals, action.payload],
        loading: false,
      };
    case ProducerActionTypes.DELETE_DEAL:
      return {
        ...state,
        deals: state.deals.filter((deal) => deal.id !== action.payload),
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

    case ProducerActionTypes.SET_DEAL:
      return {
        ...state,
        currentDeal: action.payload,
      };
    case ProducerActionTypes.CLEAR_DEAL:
      return {
        ...state,
        currentDeal: null,
      };

    default:
      return state;
  }
};
