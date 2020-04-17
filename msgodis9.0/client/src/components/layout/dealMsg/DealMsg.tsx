/* eslint-disable react/prop-types */
import * as React from 'react';

interface Props {
  toggleSocketDeal: () => void;
}

const DealMsg: React.FC<Props> = ({ toggleSocketDeal }) => {
  React.useEffect(() => {
    setTimeout(() => {
      toggleSocketDeal();
    }, 5000);
  }, [toggleSocketDeal]);


  return (
    <div className="Socket-Msg">
      {' '}
      <h3> We got a Deal !!! </h3>
      <h5>Check out the Deals!!!</h5>
      {' '}
    </div>
  );
};
export default DealMsg;
