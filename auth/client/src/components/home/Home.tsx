import * as React from 'react';
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
    </div>
  );
};


export default connect(null, { loadUser })(Home);
