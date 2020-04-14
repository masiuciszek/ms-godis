/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import * as React from 'react';
import './Candy.css';
import { connect } from 'react-redux';
import { IProduct } from '../../redux/shop/shop.types';
import { addProduct } from '../../redux/cart/cart.actions';
import { AppState } from '../../redux';
import { selectUser } from '../../redux/auth/aut.selector';
import { IUserData } from '../../redux/auth/auth.types';


interface Props {
  product: IProduct;
  addProduct: (product: IProduct) => void;
  user: IUserData | null;
}

const CandyItem: React.FC<Props> = ({ product, addProduct, user }) => (
  <>
    <div className="Candy">
      <div className="Candy-header">
        <h3>
          {product.name}
          {' '}
        </h3>
      </div>
      {/* /CandyHeader */}
      <div className="Candy-body">
        <p>
          Quantity:
          {' '}
          <span>
            {product.qty}
            {' '}
            kg
          </span>
        </p>
        <p>
          Price:
          {' '}
          <span>
            {product.price}
            {' '}
            $
          </span>
        </p>
        <p>
          Producer:
          {' '}
          {/* <span>{product.producer.name !== null ? product.producer.name : ''}</span> */}
        </p>


      </div>
      {/* /Candy-body */}
      {user && user.role !== 'admin' && (<button className="Btn" type="button" onClick={() => addProduct(product)}>Add To Cart</button>)}

      {/* /Candy */}
    </div>


  </>
);

const mapStateToProps = (state: AppState) => ({
  user: selectUser(state),
});

export default connect(mapStateToProps, { addProduct })(CandyItem);
