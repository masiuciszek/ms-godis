/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
import * as React from 'react';
import {
  Route, Switch, RouteComponentProps,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../home/Home';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Admin from '../admin/Admin';
import Consumer from '../consumer/Consumer';
import Producer from '../producer/Producer';
import CandyStock from '../candy_stock/CandyStock';
import CandyList from '../candy_stock/CandyList';
import Checkout from '../checkout/Checkout';
import { AppState } from '../../redux';
import { selectUser } from '../../redux/auth/aut.selector';
import { IUserData } from '../../redux/auth/auth.types';
import ProducerList from '../admin/ProducerList';
import ConsumerList from '../admin/ConsumerList';
import DealList from '../deals/DealList';


interface Props {
  user: IUserData | null;
}

interface PrivetRoutesProp {
  path: string;
  exact?: boolean;
  user?: IUserData | null ;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  // component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

}

const PrivateRoute: React.FC<PrivetRoutesProp> = ({
  component, exact, path, user,
}) => {
  const finalComponent = user ? component : Login;
  return <Route exact={exact} path={path} component={finalComponent} />;
};


const Router: React.FC<Props> = ({ user }) => (
  <Switch>
    {/* <Redirect from="/" to="/login" /> */}
    <PrivateRoute user={user} exact path="/" component={Home} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute user={user} exact path="/admin" component={Admin} />
    <PrivateRoute user={user} exact path="/user" component={Consumer} />
    <PrivateRoute user={user} exact path="/producer" component={Producer} />
    <PrivateRoute user={user} exact path="/add-candy" component={CandyStock} />
    <PrivateRoute user={user} exact path="/candy-list" component={CandyList} />
    <PrivateRoute user={user} exact path="/checkout" component={Checkout} />
    <PrivateRoute user={user} exact path="/producers-list" component={ProducerList} />
    <PrivateRoute user={user} exact path="/consumer-list" component={ConsumerList} />
    <PrivateRoute user={user} exact path="/deal-list" component={DealList} />
  </Switch>
);

const mapStateToProps = (state: AppState) => ({
  user: selectUser(state),
});
export default connect(mapStateToProps)(Router);
