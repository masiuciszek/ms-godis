/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../../redux';
import { logoutUser } from '../../../redux/auth/auth.actions';
import { IUserData } from '../../../redux/auth/auth.types';

interface Props {
  isAuth: boolean;
  isLoading: boolean;
  user: IUserData | null;
  logoutUser: () => Promise<void>;
}

interface INavLink {
  id: number;
  text: string;
  path: string;
}

const NavList: React.FC<Props> = ({
  isAuth, isLoading, logoutUser, user,
}) => {
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
            <span onClick={() => {
              logoutUser();
            }}
            >
              Logout
            </span>
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
  user: state.auth.user,
});

export default connect(mapStateToProps, { logoutUser })(NavList);
