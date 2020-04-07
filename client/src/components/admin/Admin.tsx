import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import { AppState } from '../../redux';
import { IUserData } from '../../redux/auth/auth.types';
import Card from '../layout/Card';

interface Props extends RouteComponentProps {
  user: IUserData | null;
  isLoading: boolean;
  history: H.History<any>;

}

const Admin: React.FC<Props> = ({ user, isLoading, history }) => {
  React.useEffect(() => {
    if (user === null) {
      history.push('/');
    }
  }, [user]);

  return !isLoading ? (
    <div className="mt-5">
      {' '}
      <h1 className="display-1"> for admins </h1>
      <h3 className="display-3"> The kings Sebastian and Marcell </h3>
      {!isLoading && user !== null ? (
        <h3 className="display-3">
          {' '}
          Welcome master
          {' '}
          {user.username}
          {' '}
        </h3>
      ) : <h3 className="display-3">...Loading</h3> }

      <div className="option-box mt-5" style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Card title="edit producer" link1="edit " path1="/producers-list" />
        <Card title="edit a consumer" link1="edit" path1="/consumer-list" />

      </div>

    </div>
  ) : <h3 className="display-3">...Loading</h3>;
};


const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
  isLoading: state.auth.loading,
});

export default connect(mapStateToProps)(Admin);
