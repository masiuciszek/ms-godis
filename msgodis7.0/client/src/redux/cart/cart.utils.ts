import { IProduct } from '../shop/shop.types';

export const addItemToCart = (cartItems: IProduct[], itemToAdd: IProduct) => {
  const isThereCartItem = cartItems.find((item) => item.id === itemToAdd.id);
  if (isThereCartItem) {
    return cartItems.map((item) => (item.id === itemToAdd.id ? { ...item, qty: item.qty + 1 } : item));
  }
  return [...cartItems, { ...itemToAdd, qty: 1 }];
};

export const calculateTotalPrice = (
  cartItems: IProduct[],
) => cartItems.map((cartPrice) => cartPrice.price += cartPrice.price);


export const removeFromCartItem = (cartItems: IProduct[], cartItemToRemove: IProduct) => {
  const existingCartItem = cartItems.find((item) => item.id === cartItemToRemove.id);

  if (existingCartItem?.qty === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }

  return cartItems.map((item) => (item.id === cartItemToRemove.id ? { ...item, qty: item.qty - 1 } : item));
};
