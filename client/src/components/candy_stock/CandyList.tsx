import * as React from 'react';

interface Props {

}

const CandyList: React.FC<Props> = () => {
  let a;
  return (
    <ul className="list-group mt-5">

      <li className="list-group-item">candy1</li>
      <li className="list-group-item">candy2</li>
      <li className="list-group-item">candy3</li>


    </ul>
  );
};
export default CandyList;
