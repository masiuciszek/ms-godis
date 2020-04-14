/* eslint-disable import/extensions */
import { IConsumerState, ConsumerReducerType } from './consumer.types';


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
