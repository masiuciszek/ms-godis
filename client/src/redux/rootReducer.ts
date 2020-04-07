/* eslint-disable import/extensions */

import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import producerReducer from './producer/producer.reducer';
import consumerReducer from './concumer/concumer.reducer';


export default combineReducers({
  auth: authReducer,
  producer: producerReducer,
  consumer: consumerReducer,
});
