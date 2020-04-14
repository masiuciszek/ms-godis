/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { selectDeals, selectProducerIsLoading } from '../../redux/producer/producer.select';
import { getProducerDeals } from '../../redux/producer/producer.actions';
import { IDealData } from '../../redux/producer/producer.types';
import Spinner from '../layout/Spinner';
import DealItem from './DealItem';
import { selectUser } from '../../redux/auth/aut.selector';
import { IUserData } from '../../redux/auth/auth.types';
import './Deal.css';

interface Props {
  getProducerDeals: () => Promise<void>;
  deals: IDealData[];
  isLoading: boolean;
  user: IUserData|null;
}

const DealList: React.FC<Props> = ({
  getProducerDeals, deals, isLoading, user,
}) => {
  React.useEffect(() => {
    getProducerDeals();
  }, [getProducerDeals]);

  return isLoading && deals.length === 0 ? <Spinner /> : (
    <>
      <h3 id="User-deal-title">
        {user && user.username }
        's
        {' '}
        Deals
      </h3>
      <div className="Producer-Deals">

        {!isLoading && deals.length > 0 ? deals.map((deal: IDealData) => <DealItem key={deal.id} deal={deal} />) : <Spinner /> }
      </div>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  deals: selectDeals(state),
  isLoading: selectProducerIsLoading(state),
  user: selectUser(state),
});

export default connect(mapStateToProps, { getProducerDeals })(DealList);
