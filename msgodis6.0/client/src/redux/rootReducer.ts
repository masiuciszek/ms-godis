/* eslint-disable import/extensions */

import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import producerReducer from './producer/producer.reducer';
import consumerReducer from './concumer/concumer.reducer';
import shopReducer from './shop/shop.reducer';
import cartReducer from './cart/cart.reducer';


export default combineReducers({
  auth: authReducer,
  producer: producerReducer,
  consumer: consumerReducer,
  shop: shopReducer,
  cart: cartReducer,
});
