/* eslint-disable no-shadow */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../../redux';
import { IProduct } from '../../../redux/shop/shop.types';
import { selectCartTotal, selectCartItems } from '../../../redux/cart/cart.selector';
import DropDownItem from './DropDownItem';
import { addProduct, deleteProductFromCart, removeProduct } from '../../../redux/cart/cart.actions';


interface Props {
  cartItems: IProduct[];
  total: number;
  addProduct: (product: IProduct) => void;
  deleteProductFromCart: (id: number) => void;
  removeProduct: (item: IProduct) => void;
}

const DropDown: React.FC<Props> = ({
  cartItems, total, addProduct, deleteProductFromCart, removeProduct,
}) => (
  <div className="DropDownCart">
    {cartItems.length > 0 && cartItems.map((item) => (
      <DropDownItem
        key={item.id}
        item={item}
        addProduct={addProduct}
        deleteProductFromCart={deleteProductFromCart}
        removeProduct={removeProduct}
      />
    )) }
    <div className="CartFooter">
      <strong className="total">
        Total Price:
        {' '}
        {cartItems.length > 0 && total !== 0 && total}
        {' '}
      </strong>
      {cartItems.length > 0 && (
        <Link to="/checkout">
          {' '}
          <button type="button">Checkout</button>
          {' '}
        </Link>
      )}
    </div>


  </div>
);


const mapStateToProps = (state: AppState) => ({
  total: selectCartTotal(state),
  cartItems: selectCartItems(state),
});


export default connect(
  mapStateToProps, { addProduct, deleteProductFromCart, removeProduct },
)(DropDown);
