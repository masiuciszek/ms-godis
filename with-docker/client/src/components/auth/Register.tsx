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

interface Props extends RouteComponentProps {
  registerUser: (formData: IFormData) => Promise<void>;
  history: H.History<any>;
  isAuth: boolean;
  user: IUserData | null;
}


const Register: React.FC<Props> = ({
  registerUser, history, isAuth, user,
}) => {
  const [formData, setFormData] = React.useState<IFormData>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    adress: '',
  });


  React.useEffect(() => {
    if (isAuth && user && user?.role === 'admin') {
      history.push('/admin');
    }
    if (isAuth && user && user?.role === 'user') {
      history.push('/user');
    }
    if (isAuth && user && user?.role === 'producer') {
      history.push('/producer');
    }
  }, [isAuth]);

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
  isAuth: state.auth.isAuth,
  user: state.auth.user,
});

export default connect(mapStateToProps, { registerUser })(Register);
