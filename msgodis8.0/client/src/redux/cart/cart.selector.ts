/* eslint-disable import/extensions */
import { createSelector } from 'reselect';
import { AppState } from '..';
import { ICartState } from './cart.types';
import { IProduct } from '../shop/shop.types';

const selectCart = (state: AppState) => state.cart;


export const selectCartItems = createSelector(
  [selectCart],
  (cart: ICartState) => cart.productsCart,
);


export const cartLoading = createSelector(
  [selectCart],
  (cart: ICartState) => cart.loading,
);


export const selectCartItemCount = createSelector(
  [selectCartItems],
  (cartItems: IProduct[]) => cartItems.reduce((quantity, item) => quantity + item.qty, 0),
);


export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems: IProduct[]) => cartItems.reduce((quantity, item) => quantity + item.qty * item.price, 0),
);

export const selectOrder = createSelector(
  [selectCart],
  (state: ICartState) => state.products,
);


export const selectCartIsHidden = createSelector(
  [selectCart],
  (state: ICartState) => state.hidden,
);

export const selectDealsProducts = createSelector(
  [selectCart],
  (state: ICartState) => state.dealsProducts,
);
