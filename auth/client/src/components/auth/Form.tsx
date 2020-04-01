/* eslint-disable react/prop-types */
import * as React from 'react';
import { IFormData } from '../../redux/auth/auth.types';

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: IFormData;
}

const Form: React.FC<Props> = ({ handleChange, handleSubmit, formData }) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="username">
      <span>username</span>
      <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleChange} />
    </label>

    <label htmlFor="password">
      <span>password</span>
      <input type="text" name="password" placeholder="password" value={formData.password} onChange={handleChange} />
    </label>
    <button type="submit">submit</button>
  </form>
);
export default Form;
