import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {

}

const Home: React.FC<Props> = () => (
  <div>

    <h1> Welcome </h1>
    <h3>
      {' '}
      <Link to="/register">Register</Link>
      {' '}
    </h3>
    <h3>
      {' '}
      <Link to="/login">Login</Link>
      {' '}
    </h3>

  </div>
);
export default Home;
