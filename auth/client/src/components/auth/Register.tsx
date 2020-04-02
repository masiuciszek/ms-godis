/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import * as H from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { registerUser } from '../../redux/auth/auth.actions';
import { IFormData } from '../../redux/auth/auth.types';
import Form from './Form';
import { AppState } from '../../redux';

interface Props extends RouteComponentProps {
  registerUser: (formData: IFormData) => Promise<void>;
  history: H.History<any>;
  isAuth: boolean;
}


const Register: React.FC<Props> = ({ registerUser, history, isAuth }) => {
  const [formData, setFormData] = React.useState<IFormData>({
    username: '',
    password: '',
  });


  React.useEffect(() => {
    if (isAuth) {
      history.push('/');
    }
  });

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
    });
  };

  return (
    <>
      <h1>REGISTER</h1>
      <Form handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { registerUser })(Register);
