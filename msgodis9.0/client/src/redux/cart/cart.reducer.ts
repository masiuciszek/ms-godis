/* eslint-disable import/extensions */
import { ICartState, ActionTypesCart, CartActionTypes } from './cart.types';
import { addItemToCart, removeFromCartItem } from './cart.utils';
// import { removeFromCartItem } from '../concumer/consumer.utils';

const initialState: ICartState = {
  hidden: false,
  loading: true,
  productsCart: [],
  products: null, // finalorder
  dealsProducts: [],

};

export default (state: ICartState = initialState, action: CartActionTypes) => {
  switch (action.type) {
    case ActionTypesCart.ADD_ITEM:
      return {
        ...state,
        productsCart: addItemToCart(state.productsCart, action.payload),
        loading: false,
      };
    case ActionTypesCart.DELETE_ITEM_FROM_CART:
      return {
        ...state,
        productsCart: state.productsCart.filter((product) => product.id !== action.payload),
        loading: false,
      };
    case ActionTypesCart.MAKE_ORDER:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

    case ActionTypesCart.CLEAR_ORDER:
      return {
        ...state,
        products: null,
        productsCart: [],
      };
    case ActionTypesCart.REMOVE_ITEM:
      return {
        ...state,
        productsCart: removeFromCartItem(state.productsCart, action.payload),
        loading: false,
      };
    case ActionTypesCart.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case ActionTypesCart.GET_DEALS:
      return {
        ...state,
        dealsProducts: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
