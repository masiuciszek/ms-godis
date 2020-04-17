/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import * as H from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { getMyOrders } from '../../../redux/concumer/consumer.actions';
import { AppState } from '../../../redux';
import { selectMyOrders, selectIsLoading } from '../../../redux/concumer/consumer.selector';
import OrderShowCaseItem from './OrderShowCaseItem';
import './OrderShowcase.css';

interface Props extends RouteComponentProps {
  myOrders: Record<string, any>[];
  isLoading: boolean;
  getMyOrders: () => Promise<void>;
  history: H.History<any>;
}


const OrderShowCase: React.FC<Props> = ({
  myOrders, isLoading, getMyOrders, history,
}) => {
  React.useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);


  return (
    <div className="OrderShowCase">
      {!isLoading && myOrders.length > 0 ? myOrders.map((order, index) => (
        <OrderShowCaseItem key={order.id} order={order} history={history} />
      )) : <h3 style={{ fontSize: '3rem' }}>No orders</h3> }
    </div>
  );
};


const mapStateToProps = (state: AppState) => ({
  myOrders: selectMyOrders(state),
  isLoading: selectIsLoading(state),
});


export default connect(mapStateToProps, { getMyOrders })(OrderShowCase);
