/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import * as React from 'react';
import * as H from 'history';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AppState } from '../../redux';
import { IProduct } from '../../redux/shop/shop.types';
import CartItem from './CartItem';
import './Checkout.css';
import { selectCartTotal, selectCartItems, cartLoading } from '../../redux/cart/cart.selector';
import { makeOrder, clearOrder, toggleCartDropDown } from '../../redux/cart/cart.actions';
import Spinner from '../layout/Spinner';
import { IOrderProduct } from '../../redux/cart/cart.types';

interface Props extends RouteComponentProps {
  userCart: IProduct[];
  total: number;
  isLoading: boolean;
  makeOrder: (products: IOrderProduct[]) => Promise<void>;
  history: H.History<any>;
  clearOrder: () => void;
  toggleCartDropDown: () => void;
}


const Checkout: React.FC<Props> = ({
  userCart, total,
  makeOrder, isLoading,
  history, clearOrder,
  toggleCartDropDown,
}) => {
  React.useEffect(() => {
    toggleCartDropDown();
  }, []);

  const getHome = () => history.push('/');
  const handleMakeOrder = () => {
    const products = userCart.map((x) => {
      const order: IOrderProduct = { id: x.id, qty: x.qty };
      return order;
    });

    makeOrder(products);
    clearOrder(); // clear order car after mad a successfully order
    getHome();
  };


  return isLoading ? <Spinner /> : (
    <div className="Checkout">
      <h1> Checkout </h1>
      <h3>Your Items</h3>
      <div className="Checkout-Cart">
        <div className="Checkout-Header">
          <h4>Name</h4>
          <h4>
            {' '}

            {' '}
            Qty
            {' '}

            {' '}
          </h4>
          <h4>Price</h4>
        </div>
        {userCart.length === 0 && <h3>Cart Item empty</h3> }
        {userCart.length > 0 && userCart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        <div className="Checkout-footer">
          <p className="total-price">
            Total:
            {userCart.length > 0 && total !== 0 && total}
          </p>
          <button type="button" onClick={handleMakeOrder}>Pay</button>
        </div>
      </div>

    </div>
  );
};
const mapStateToProps = (state: AppState) => ({
  userCart: selectCartItems(state),
  total: selectCartTotal(state),
  isLoading: cartLoading(state),
});


export default connect(mapStateToProps, { makeOrder, clearOrder, toggleCartDropDown })(Checkout);
