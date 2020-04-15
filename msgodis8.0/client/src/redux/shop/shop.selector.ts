/* eslint-disable import/extensions */
import { createSelector } from 'reselect';
import { IShopState } from './shop.types';
import { AppState } from '..';


const selectShop = (state: AppState) => state.shop;


export const selectProducts = createSelector(
  [selectShop],
  (shop: IShopState) => shop.products,
);


export const selectProductsIsLoading = createSelector(
  [selectShop],
  (shop: IShopState) => shop.isLoading,
);


export const selectFilteredProducts = createSelector(
  [selectShop],
  (shop: IShopState) => shop.filteredProducts,
);
