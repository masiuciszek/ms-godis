/* eslint-disable react/prop-types */
import * as React from 'react';
import { IFormData } from '../../redux/auth/auth.types';

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: IFormData;
  isRegister: boolean;
}

const Form: React.FC<Props> = ({
  handleChange, handleSubmit, formData, isRegister,
}) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="username">
      <span>username</span>
      <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleChange} />
    </label>

    <label htmlFor="password">
      <span>password</span>
      <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} />
    </label>

    {isRegister && (
      <>
        <label htmlFor="firstName">
          <span>first name</span>
          <input type="text" name="firstName" placeholder="firstName" value={formData.firstName} onChange={handleChange} />
        </label>

        <label htmlFor="lastName">
          <span>last name</span>
          <input type="text" name="lastName" placeholder="lastName" value={ formData.lastName} onChange={handleChange} />
        </label>

        <label htmlFor="adress">
          <span>address</span>
          <input type="text" name="adress" placeholder="adress" value={formData.adress} onChange={handleChange} />
        </label>
      </>
    )}
    <button type="submit" className="btn btn-lg btn-primary">submit</button>
  </form>
);
export default Form;
