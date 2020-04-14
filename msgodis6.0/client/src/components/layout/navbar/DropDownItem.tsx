/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { IProduct } from '../../../redux/shop/shop.types';

interface Props {
  item: IProduct;
  addProduct: (product: IProduct) => void;
  deleteProductFromCart: (id: number) => void;
  removeProduct: (item: IProduct) => void;
}

const DropDownItem: React.FC<Props> = ({
  item, addProduct, deleteProductFromCart, removeProduct,
}) => (
  <li key={item.id} id="DropDownItem">
    <p>{item.name}</p>
    {' '}

    {' '}
    <p>
      <span className="arrow" onClick={() => removeProduct(item)}> &#8249; </span>
      {' '}
      {item.qty}
      {' '}
      <span className="arrow" onClick={() => addProduct(item)}>&#8250;</span>
    </p>
    {' '}

    {' '}

    {' '}
    <p>
      {item.price}
      {' '}
      $
    </p>

    {' '}
    <p><span className="delete" onClick={() => deleteProductFromCart(item.id)}>&#x292C;</span></p>
  </li>
);
export default DropDownItem;
