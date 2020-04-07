/* eslint-disable import/extensions */
/* eslint-disable no-undef */

import { IProducerState, ProducerActionTypes, ProducerTypesReducer } from './producer.types';

const initialState: IProducerState = {
  loading: true,
  producer: null,
  error: null,
  orderProduct: null,
  deal: null,
  products: [],

};

export default (state: IProducerState = initialState, action: ProducerTypesReducer) => {
  switch (action.type) {
    case ProducerActionTypes.CREATE_PRODUCER:
      return {
        ...state,
        producer: action.payload,
        loading: false,
      };
    case ProducerActionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
      };

    default:
      return state;
  }
};
