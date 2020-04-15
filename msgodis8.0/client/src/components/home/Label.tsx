/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import * as React from 'react';
import { connect } from 'react-redux';
import LabelItem from './LabelItem';
import { IProduct } from '../../redux/shop/shop.types';
import { clearSearch, getAllProducts } from '../../redux/shop/shop.actions';
import { AppState } from '../../redux';
import { selectProducts } from '../../redux/shop/shop.selector';


interface Props {
  allProducts: IProduct[];
  isLoading: boolean;
  clearSearch: () => void;
  getAllProducts: () => Promise<void>;
  toggle: () => void;
  showDeals: boolean;
}

const Label: React.FC<Props> = ({
  allProducts, isLoading, clearSearch, toggle, showDeals,
}) => {
  // const producersXs = allProducts.map((producer) => producer.producer.name);
  const producersXs = allProducts.map((product) => {
    if (product && !isLoading && product.producer !== null) {
      return product.producer.name;
    }
    return product;
  });


  const uniqueProducersTitle = producersXs.filter((item, index) => producersXs.indexOf(item) === index);


  return (
    <div className="Label-producers">
      {uniqueProducersTitle.map((producer: any, index: any) => <LabelItem key={index} producer={producer} />)}
      <p className="LabelItem reset-all" onClick={() => clearSearch()}> all Producers </p>
      <p className="LabelItem reset-all" onClick={toggle}>
        {' '}
        {showDeals ? 'Hide deals' : 'Show deals'}
        {' '}
      </p>

    </div>
  );
};


const mapStateToProps = (state: AppState) => ({
  allProducts: selectProducts(state),
});


export default connect(mapStateToProps, { clearSearch, getAllProducts })(Label);
