import * as React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { loadUser } from '../../redux/auth/auth.actions';

interface Props {
  loadUser: () => void;
}

const Home: React.FC<Props> = ({ loadUser }) => {
  React.useEffect(() => {
    loadUser();
  }, []);
  return (
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
};


export default connect(null, { loadUser })(Home);
