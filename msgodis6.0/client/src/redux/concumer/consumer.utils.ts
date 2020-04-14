/* eslint-disable import/extensions */
import { IProduct } from '../shop/shop.types';

export const adDItemToCart = (cartItems: IProduct[], cartItemToAdd: IProduct) => {
  const isThereACartItemAlreadyInBasket = cartItems.find((item) => item.id === cartItemToAdd.id);
  if (isThereACartItemAlreadyInBasket) {
    return cartItems.map((item) => (item.id === cartItemToAdd.id ? { ...item, qty: item.qty + 1 } : item));
  }
  return [...cartItems, { ...cartItemToAdd, qty: 1 }];
};


// export const calculatePrice = (
//   cartItems: IProduct[],
// ) => cartItems.map((item) => item.price += item.price);


export const removeFromCartItem = (cartItems: IProduct[], cartItemToRemove: IProduct) => {
  const existingCartItem = cartItems.find((item) => item.id === cartItemToRemove.id);

  if (existingCartItem?.qty === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }

  return cartItems.map(
    (item) => (item.id === cartItemToRemove.id ? { ...item, qty: item.qty - 1 } : item),
  );
};
