/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */

import * as React from 'react';


interface Props{

}

const Home: React.FC<Props> = () => (
  <div>
    <h1> Welcome to Easter Egg App </h1>
    <h3>
      <span>By</span>
      {' '}
      Sebastian the Dev ops hacker
      {' '}
      <span>and</span>
      {' '}
      Marcell the ....
      {' '}
    </h3>
  </div>
);

export default Home;
