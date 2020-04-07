/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { IUserData } from '../../redux/auth/auth.types';
import Spinner from '../layout/Spinner';

interface Props {
  user: IUserData | null;
  isLoading: boolean;

}

const Consumer: React.FC<Props> = ({ user, isLoading }) => (!isLoading ? (
  <div>
    {' '}
    <h1 className="display-1">
      {' '}
      Hello
      {' '}
      {!isLoading && user && user.username }
      {' '}

      {' '}
    </h1>

    <h3 className="display-3"> Let's shop some Candy </h3>
  </div>
) : <Spinner />);


const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
  isLoading: state.auth.loading,
});


export default connect(mapStateToProps)(Consumer);
