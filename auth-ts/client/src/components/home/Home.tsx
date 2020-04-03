/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import * as React from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../redux/auth/auth.actions';
import { AppState } from '../../redux';


interface Props {
  loadUser: () => void;
  token: any;

}

const Home: React.FC<Props> = ({ loadUser, token }) => {
  React.useEffect(() => {
    if (!token) {
      console.log('no token');
    } else {
      loadUser();
    }
  }, []);

  return (
    <div>
      <h1> Welcome </h1>
    </div>
  );
};


const mapStateToProps = (state: AppState) => ({
  token: state.auth.token,

});

export default connect(mapStateToProps, { loadUser })(Home);
