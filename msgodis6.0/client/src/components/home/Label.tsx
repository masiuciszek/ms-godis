/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import * as React from 'react';
import { connect } from 'react-redux';
import LabelItem from './LabelItem';
import { IProduct } from '../../redux/shop/shop.types';
import { clearSearch } from '../../redux/shop/shop.actions';


interface Props {
  allProducts: IProduct[];
  isLoading: boolean;
  clearSearch: () => void;
}

const Label: React.FC<Props> = ({ allProducts, isLoading, clearSearch }) => {
  const producersXs: string[] = allProducts.map(
    (producer) => producer.producer.name,
  );


  const uniqueProducersTitle = producersXs.filter((item, index) => producersXs.indexOf(item) === index);

  return (
    <div className="Label-producers">
      {uniqueProducersTitle.map((producer, index) => <LabelItem key={index} producer={producer} />)}
      <p className="LabelItem reset-all" onClick={() => clearSearch()}> all Producers </p>
    </div>
  );
};


export default connect(null, { clearSearch })(Label);
