/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import * as H from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { registerUser } from '../../redux/auth/auth.actions';
import { IFormData, IUserData } from '../../redux/auth/auth.types';
import Form from './Form';
import { AppState } from '../../redux';
import './auth.css';
import { selectUser, selectIsAuth, selectUserLoading } from '../../redux/auth/aut.selector';
import Spinner from '../layout/Spinner';

interface Props extends RouteComponentProps {
  registerUser: (formData: IFormData) => Promise<void>;
  history: H.History<any>;
  isAuth: boolean;
  user: IUserData | null;
  loading: boolean;
}


const Register: React.FC<Props> = ({
  registerUser, history, isAuth, user, loading,
}) => {
  const [formData, setFormData] = React.useState<IFormData>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    adress: '',
  });

  const goHome = () => history.push('/');
  React.useEffect(() => {
    if (isAuth) {
      goHome();
    }
  }, [isAuth, loading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    registerUser(formData);
    setFormData({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      adress: '',
    });
  };

  return (
    <>
      <h1>REGISTER</h1>
      <Form handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} isRegister />
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  // isAuth: state.auth.isAuth,
  isAuth: selectIsAuth(state),
  // user: state.auth.user,
  user: selectUser(state),
  loading: selectUserLoading(state),
});

export default connect(mapStateToProps, { registerUser })(Register);
