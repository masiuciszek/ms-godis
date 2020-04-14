/* eslint-disable import/extensions */
import { IConsumerState, ConsumerActionTypes, ConsumerReducerType } from './consumer.types';
import { removeFromCartItem, adDItemToCart } from './consumer.utils';


const initialState: IConsumerState = {
  loading: false,
  consumer: null,
  currentUser: null,
  error: null,
};

export default (state: IConsumerState = initialState, action: ConsumerReducerType) => {
  switch (action.type) {
    default:
      return state;
  }
};
