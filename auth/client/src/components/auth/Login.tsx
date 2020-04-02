/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import Form from './Form';
import { IFormData } from '../../redux/auth/auth.types';
import { loginUser } from '../../redux/auth/auth.actions';
import { AppState } from '../../redux';


interface Props extends RouteComponentProps{
  loginUser: Function;
  isAuth: boolean;
  history: H.History<any>;
}

//
const Login: React.FC<Props> = ({ loginUser, isAuth, history }) => {
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
    loginUser(formData);
    setFormData({
      username: '',
      password: '',
    });
  };

  return (

    <>
      <h1>LOGIN</h1>
      <Form handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { loginUser })(Login);
