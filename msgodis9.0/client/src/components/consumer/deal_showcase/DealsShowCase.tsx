/* eslint-disable import/extensions */
import * as React from 'react';

import { connect } from 'react-redux';
import { getAllDeals } from '../../../redux/cart/cart.actions';
import { AppState } from '../../../redux';
import { selectDealsProducts, cartLoading } from '../../../redux/cart/cart.selector';
import ShowCaseItem from './ShowCasItem';
import './DealsShowCase.css';

interface Props {
  getAllDeals: () => Promise<void>;
  allDeals: Record<string, any>[];
  isLoading: boolean;
}

const DealsShowCase: React.FC<Props> = ({ getAllDeals, allDeals, isLoading }) => {
  React.useEffect(() => {
    getAllDeals();
  }, [getAllDeals]);


  return (
    <>
      {!isLoading && allDeals.length > 0 ? allDeals.map(
        (deal) => <ShowCaseItem key={deal.id} deal={deal} />,
      ) : <h3>No deals...Sorry</h3> }
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  allDeals: selectDealsProducts(state),
  isLoading: cartLoading(state),
});

export default connect(mapStateToProps, { getAllDeals })(DealsShowCase);
