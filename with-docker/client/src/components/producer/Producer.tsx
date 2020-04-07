/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import { AppState } from '../../redux';
import { IUserData } from '../../redux/auth/auth.types';
import Spinner from '../layout/Spinner';
import Card from '../layout/Card';

interface Props extends RouteComponentProps {
  user: IUserData | null;
  isLoading: boolean;
  history: H.History<any>;
}

const Producer: React.FC<Props> = ({ isLoading, user, history }) => {
  React.useEffect(() => {
    if (user === null) {
      history.push('/');
    }
  }, [user]);


  return (!isLoading ? (
    <div className="mt-5">
      {!isLoading && user && (
        <h3 className="display-3">
          Welcome
          {' '}
          Producer
          {'  '}
          {user.username}
        </h3>
      )}

      <div className="options mt-5" style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Card title="Add more Candies" link1="add candies" path1="/add-candy" />
        <Card title="Candy List" link1="list" path1="/candy-list" />
      </div>
    </div>
  ) : <Spinner />);
};

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
  isLoading: state.auth.loading,
});

export default connect(mapStateToProps)(Producer);
