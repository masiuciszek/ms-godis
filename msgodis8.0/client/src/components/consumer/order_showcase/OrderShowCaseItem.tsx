/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { connect } from 'react-redux';
import { deleteMyOrder } from '../../../redux/concumer/consumer.actions';

import useToggle from '../../../hooks/useToggle';

interface Props {
  order: Record<string, any>;
  deleteMyOrder: (id: number) => Promise<void>;
}

const OrderShowCaseItem: React.FC<Props> = ({ order, deleteMyOrder }) => {
  const [showEdit, toggle] = useToggle(false);


  return (
    <div className="OrderShowCaseItem">
      <div className="Order-Header">
        <p>
          Order Created At:
          {' '}
          {order.created_at.slice(0, 10)}
        </p>
      </div>
      <ul className="Order-Body">
        {order.orderProduct.map((product: any) => (
          <>
            <li key={product.id}>

              <p>
                price:
                <span>
                  {product.price}

                  $
                </span>
              </p>

              <p>
                name:
                <span>{product.product.name}</span>
              </p>

              <p>
                qty:
                <span>{product.qty}</span>
              </p>

            </li>

          </>
        ))}
      </ul>

      <div className="Order-Footer">
        <p>
          Total Price :
          {' '}
          {order.total}
          {' '}
          $
        </p>
      </div>

      <div className="Options-Cta">
        <button type="button" onClick={() => deleteMyOrder(order.id)}>Delete order</button>
      </div>
    </div>
  );
};


export default connect(null, { deleteMyOrder })(OrderShowCaseItem);
