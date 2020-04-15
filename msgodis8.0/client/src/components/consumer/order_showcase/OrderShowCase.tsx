/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import * as React from 'react';
import { connect } from 'react-redux';
import { getMyOrders } from '../../../redux/concumer/consumer.actions';
import { AppState } from '../../../redux';
import { selectMyOrders, selectIsLoading } from '../../../redux/concumer/consumer.selector';
import OrderShowCaseItem from './OrderShowCaseItem';
import './OrderShowcase.css';

interface Props {
  myOrders: Record<string, any>[];
  isLoading: boolean;
  getMyOrders: () => Promise<void>;
}


const OrderShowCase: React.FC<Props> = ({ myOrders, isLoading, getMyOrders }) => {
  React.useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);


  return (
    <div className="OrderShowCase">
      {!isLoading && myOrders.length > 0 ? myOrders.map((order) => (
        <OrderShowCaseItem key={order.id} order={order} />
      )) : <h3 style={{ fontSize: '3rem' }}>No orders</h3> }

    </div>
  );
};


const mapStateToProps = (state: AppState) => ({
  myOrders: selectMyOrders(state),
  isLoading: selectIsLoading(state),
});


export default connect(mapStateToProps, { getMyOrders })(OrderShowCase);
