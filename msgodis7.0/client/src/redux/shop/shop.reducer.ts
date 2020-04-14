/* eslint-disable import/extensions */
import { IShopState, ActionTypesShop, ShopActionTypes } from './shop.types';

const initialState: IShopState = {
  isLoading: true,
  error: null,
  products: [],
  filteredProducts: null,
  randomProducts: null,
};

export default (state: IShopState = initialState, action: ShopActionTypes) => {
  switch (action.type) {
    case ActionTypesShop.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    case ActionTypesShop.SEARCH_BY_PRODUCER:
      return {
        ...state,
        filteredProducts: action.payload,
        loading: false,
      };
    case ActionTypesShop.FILTER_PRODUCTS:
      return {
        ...state,
        filteredProducts: state.products.filter((product) => {
          const reg = new RegExp(`${action.payload}`, 'gi');
          return product.name.match(reg) || product.producer.name.match(reg);
        }),
        loading: false,
      };
    case ActionTypesShop.CLEAR_SEARCH:
      return {
        ...state,
        filteredProducts: null,
      };
    case ActionTypesShop.GET_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
