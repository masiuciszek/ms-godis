/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/extensions */
import * as React from 'react';
import { connect } from 'react-redux';
import { IProduct } from '../../redux/shop/shop.types';
import { addProduct, removeProduct } from '../../redux/cart/cart.actions';


interface Props {
  item: IProduct;
  removeProduct: (item: IProduct) => void;
  addProduct: (product: IProduct) => void;
}


const CartItem: React.FC<Props> = ({ item, removeProduct, addProduct }) => (
  <div className="CheckoutItem">
    <p>{item.name}</p>
    <p>
      {' '}
      <span
        id="decrease"
        onClick={() => removeProduct(item)}
      >
        &#8249;

      </span>
      {' '}
      {item.qty}
      {' '}
      <span id="increase" onClick={() => addProduct(item)}>&#8250;</span>
      {' '}
    </p>
    <p>{item.price}</p>
  </div>
);


export default connect(null, { addProduct, removeProduct })(CartItem);
