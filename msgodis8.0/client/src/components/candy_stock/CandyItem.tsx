/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { IProduct } from '../../redux/shop/shop.types';
import { IDeal } from '../../redux/producer/producer.types';

interface Props {
  candy: IProduct;
  deleteProduct: (productId: number) => Promise<void>;
  handleCurrent: (val: IProduct) => void;
  handleSetDeal: (deal: IDeal) => void;
}

const CandyItem: React.FC<Props> = ({
  candy, deleteProduct, handleCurrent, handleSetDeal,
}) => {
  const dealItem: IDeal = { productId: candy.id, price: candy.price };
  return (
    <>
      <li id="CandyItem">
        <p>
          Name:
          <span>{candy.name}</span>
        </p>

        <p>
          Qty:

          <span>{candy.qty}</span>
        </p>

        <p>
          Price:
          <span>
            {candy.price}
          </span>
        </p>

        <div className="cta">
          <span id="edit-pen" onClick={() => handleCurrent(candy)}>
            &#9998;
          </span>
          <span id="deal-icon" onClick={() => handleSetDeal(dealItem)}>
            &#x261D;
          </span>
          <span id="delete-icon" onClick={() => deleteProduct(candy.id)}>
            &#10008;
          </span>
        </div>
      </li>
    </>
  );
};

export default CandyItem;
