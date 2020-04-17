import * as React from 'react';

import { connect } from 'react-redux';


interface Props {

}

const ProducerList: React.FC<Props> = () => (
  <div>
    {' '}
    <h1> All producers </h1>
    {' '}
  </div>
);


// const mapStateToProps = (state:AppState) => {
//   return {
//     allProducers: state
//   }
// }
export default connect(null)(ProducerList);
