/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../../redux';
import { logoutUser } from '../../../redux/auth/auth.actions';

interface Props {
  isAuth: boolean;
  isLoading: boolean;
  logoutUser: () => Promise<void>;
}

interface INavLink {
  id: number;
  text: string;
  path: string;
}

const NavList: React.FC<Props> = ({ isAuth, isLoading, logoutUser }) => {
  const navLinks: INavLink[] = [

    {
      id: 1,
      text: 'login',
      path: '/login',
    },
    {
      id: 2,
      text: 'register',
      path: '/register',
    },
  ];
  return (
    <ul id="navList">
      {!isLoading && isAuth ? (
        <>
          <li>
            {' '}
            <Link to="/">Home</Link>
            {' '}
          </li>
          <li>
            {' '}
            <span onClick={() => {
              console.log('apa');
              logoutUser();
            }}
            >
              Logout

            </span>
            {' '}
          </li>
        </>
      ) : navLinks.map((link) => (
        <li key={link.id}>
          {' '}
          <Link to={link.path}>{link.text}</Link>
          {' '}
        </li>
      )) }
    </ul>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuth: state.auth.isAuth,
  isLoading: state.auth.loading,
});

export default connect(mapStateToProps, { logoutUser })(NavList);
