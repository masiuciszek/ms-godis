/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import Form from './Form';
import { IFormData, IUserData } from '../../redux/auth/auth.types';
import { loginUser } from '../../redux/auth/auth.actions';
import { AppState } from '../../redux';
import './auth.css';
import { selectUser, selectIsAuth, selectUserLoading } from '../../redux/auth/aut.selector';


interface Props extends RouteComponentProps{
  loginUser: Function;
  isAuth: boolean;
  history: H.History<any>;
  user: IUserData | null;
  loading: boolean;
}


const Login: React.FC<Props> = ({
  loginUser, isAuth, history, user, loading,
}) => {
  const [formData, setFormData] = React.useState<IFormData>({
    username: '',
    password: '',
  });


  React.useEffect(() => {
    if (isAuth) {
      history.push('/');
    }
  }, [isAuth, loading, history]);


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
      <h1 className="display-1">LOGIN</h1>
      <Form handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} isRegister={false} />
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuth: selectIsAuth(state),
  // isAuth: state.auth.isAuth,
  // user: state.auth.user,
  user: selectUser(state),
  loading: selectUserLoading(state),
});

export default connect(mapStateToProps, { loginUser })(Login);
