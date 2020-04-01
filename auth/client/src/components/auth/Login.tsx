import * as React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { IFormData } from '../../redux/auth/auth.types';
import { loginUser } from '../../redux/auth/auth.actions';


interface Props {
  loginUser: Function;
}

const Login: React.FC<Props> = ({ loginUser }) => {
  const [formData, setFormData] = React.useState<IFormData>({
    username: '',
    password: '',
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
      <Form handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />
    </>
  );
};

export default connect(null, { loginUser })(Login);
