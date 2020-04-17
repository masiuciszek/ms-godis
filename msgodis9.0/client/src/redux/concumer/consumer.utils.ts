/* eslint-disable max-len */
/* eslint-disable import/extensions */


export const addItemToOrder = (orderItems: Record<string, any>[], orderItemId: Record<string, any>) => {
  const isThereAOrderItem = orderItems.find((item) => item.id === orderItemId.id);
  if (isThereAOrderItem) {
    return orderItems.map((item) => (item.id === orderItemId.id ? { ...item, qty: item.qty + 1 } : item));
  }
  return [...orderItems, { ...orderItemId, qty: 1 }];
};


export const removeFromOrderItem = (orderItems: Record<string, any>[], cartItemToRemove: Record<string, any>) => {
  const existingCartItem = orderItems.find((item) => item.id === cartItemToRemove.id);

  if (existingCartItem?.qty === 1) {
    return orderItems.filter((item) => item.id !== cartItemToRemove.id);
  }

  return orderItems.map(
    (item) => (item.id === cartItemToRemove.id ? { ...item, qty: item.qty - 1 } : item),
  );
};
