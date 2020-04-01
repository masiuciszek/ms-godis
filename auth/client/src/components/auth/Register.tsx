/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import * as React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/auth/auth.actions';
import { IFormData } from '../../redux/auth/auth.types';
import Form from './Form';


interface Props {
  registerUser: (formData: IFormData) => Promise<void>;
}


const Register: React.FC<Props> = ({ registerUser }) => {
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

export default connect(null, { registerUser })(Register);
