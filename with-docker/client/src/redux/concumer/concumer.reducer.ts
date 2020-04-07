import { IConsumerState, ConsumerActionTypes, ConsumerReducerType } from './consumer.types';


const initialState: IConsumerState = {
  loading: false,
  consumer: null,
  producers: [],
  error: null,
};

export default (state: IConsumerState = initialState, action: ConsumerReducerType) => {
  switch (action.type) {
    case ConsumerActionTypes.GET_PRODUCERS:
      return {
        ...state,
        producers: action.payload,
        loading: false,
      };

    case ConsumerActionTypes.ADD_CONSUMER_PROFILE:
      return {
        ...state,
        consumer: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
