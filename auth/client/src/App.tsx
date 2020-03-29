/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React from 'react';
import './App.css';
import axios from 'axios';

interface IFormData {
  username: string;
  password: string;
}


function App() {
  const [formData, setFormData] = React.useState<IFormData>({
    username: '',
    password: '',
  });

  const register = async (formData: IFormData): Promise<any> => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/authapi/user/register', formData, config);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <span>Username</span>
          <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleChange} />
        </label>

        <label htmlFor="password">
          <span>Password</span>
          <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} />
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;
