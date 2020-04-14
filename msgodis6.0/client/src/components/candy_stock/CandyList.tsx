/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable import/extensions */
import * as React from 'react';
import { connect } from 'react-redux';
import {
  setCurrent, deleteProduct, getProductsByProducer, setDeal, clearDeal,
} from '../../redux/producer/producer.actions';
import { AppState } from '../../redux';
import { IProduct } from '../../redux/shop/shop.types';
import Spinner from '../layout/Spinner';
import './Candy.css';
import EditForm from './EditForm';
import useToggle from '../../hooks/useToggle';
import CandyItem from './CandyItem';
import {
  selectProducerProducts, selectProducerIsLoading, selectCurrent, selectDealCurrent,
} from '../../redux/producer/producer.select';
import { IDeal, IDealData } from '../../redux/producer/producer.types';
import DealForm from './DealForm';


interface Props {
  getProductsByProducer: () => Promise<void>;
  setCurrent: (product: IProduct) => void;
  deleteProduct: (productId: number) => Promise<void>;
  myProducts: IProduct[];
  isLoading: boolean;
  current: null | IProduct;
  setDeal: (deal: IDeal) => void;
  clearDeal: () => void;
  dealCurrent: IDeal | null;

  deals: IDealData[];
}

const CandyList: React.FC<Props> = ({
  getProductsByProducer, myProducts, isLoading,
  setCurrent, current, deleteProduct, setDeal, clearDeal, dealCurrent, deals,
}) => {
  React.useEffect(() => {
    getProductsByProducer();
  }, []);

  const [showForm, toggleForm] = useToggle(false);
  const [showDealForm, toggleDealForm] = useToggle(false);


  const handleCurrent = (val: IProduct): void => {
    setCurrent(val);
    toggleForm();
  };

  const handleSetDeal = (deal: IDeal): void => {
    setDeal(deal);
    toggleDealForm();
  };


  return isLoading ? <Spinner /> : (
    <>
      <ul className="CandyList">
        <h3>Candy list</h3>


        {!isLoading && myProducts.length > 0 && myProducts.map((candy) => (
          <CandyItem
            key={candy.id}
            candy={candy}
            handleCurrent={handleCurrent}
            deleteProduct={deleteProduct}
            handleSetDeal={handleSetDeal}
          />
        ))}

        {showForm && current !== null && (
          <EditForm current={current} toggle={toggleForm} />
        ) }

        {showDealForm && dealCurrent !== null && (
          <DealForm
            toggle={toggleDealForm}
            dealCurrent={dealCurrent}
            clearDeal={clearDeal}
          />
        ) }

      </ul>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  myProducts: selectProducerProducts(state),
  isLoading: selectProducerIsLoading(state),
  current: selectCurrent(state),
  dealCurrent: selectDealCurrent(state),

});


export default connect(
  mapStateToProps, {
    getProductsByProducer,
    setCurrent,
    deleteProduct,
    setDeal,
    clearDeal,

  },
)(CandyList);
