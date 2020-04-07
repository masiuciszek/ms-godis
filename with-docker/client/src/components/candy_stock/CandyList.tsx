/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable import/extensions */
import * as React from 'react';

import { connect } from 'react-redux';
import { getAllProducts, setCurrent, deleteProduct } from '../../redux/producer/producer.actions';
import { AppState } from '../../redux';
import { IProduct } from '../../redux/producer/producer.types';
import Spinner from '../layout/Spinner';
import { IUserData } from '../../redux/auth/auth.types';
import './Candy.css';
import EditForm from './EditForm';
import useToggle from '../../hooks/useToggle';

interface Props {
  getAllProducts: () => Promise<void>;
  setCurrent: (product: IProduct) => void;
  deleteProduct: (productId: number) => Promise<void>;
  storeProducts: IProduct[];
  isLoading: boolean;
  user: IUserData | null;
  current: null | IProduct;
}

const CandyList: React.FC<Props> = ({
  getAllProducts, storeProducts, isLoading, user, setCurrent, current, deleteProduct,
}) => {
  // const fetchProducts = React.useCallback(() => {
  //   getAllProducts();
  // }, [storeProducts]);

  React.useEffect(() => {
    getAllProducts();
    // fetchProducts();
  }, []);

  const [showForm, toggleForm] = useToggle(false);

  const producerName = user && user.username;

  const handleCurrent = React.useCallback((val: IProduct) => {
    setCurrent(val);
    toggleForm();
  }, [showForm]);

  return !isLoading ? (
    <ul className="mt-5 CandyList">
      <h3 className="display-3">Candy list</h3>
      {!isLoading && storeProducts.length === 0 && <h3 className="display-3">No products, in Stock </h3> }
      {storeProducts.length > 0 && storeProducts.filter((x) => x.producer.name === producerName).map((x) => (
        <li className="">
          {' '}
          Name:
          {' '}
          <span>{x.name}</span>
          {' '}

          Qty:
          {' '}
          <span>{x.qty}</span>

          Price:
          <span>

            {x.price}


          </span>

          <div className="cta">
            <span id="edit-pen" onClick={() => handleCurrent(x)}>
              &#9998;
            </span>
            <span id="delete-icon" onClick={() => deleteProduct(x.id)}>
              &#10008;
            </span>
          </div>
        </li>
      )) }

      {showForm && current !== null && (
        <EditForm current={current} toggle={toggleForm} />
      ) }

    </ul>

  ) : <Spinner />;
};

const mapStateToProps = (state: AppState) => ({
  storeProducts: state.producer.products,
  isLoading: state.producer.loading,
  user: state.auth.user,
  current: state.producer.current,
});


export default connect(mapStateToProps, { getAllProducts, setCurrent, deleteProduct })(CandyList);
