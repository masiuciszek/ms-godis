import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import { AppState } from '../../redux';
import { IUser } from '../../redux/auth/auth.types';
import './user.css';

interface Props extends RouteComponentProps {
  user: IUser|any;
  isAuth: boolean;
  history: H.History<any>;
  isLoading: boolean;
}

const UserProfile: React.FC<Props> = ({
  user, isAuth, history, isLoading,
}) => (


  <div className="User">
    <h1 className="User-Title">
      Welcome
      <span>{!isLoading && user && user.username}</span>
    </h1>
    <h3 className={!isLoading && user && user.role === 'admin' ? 'admin-role' : 'user-role'}>
      {' '}
      Role:
      {' '}
      {!isLoading && user && user.role}
    </h3>
  </div>
);
const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth,
  isLoading: state.auth.loading,
});

export default connect(mapStateToProps)(UserProfile);
