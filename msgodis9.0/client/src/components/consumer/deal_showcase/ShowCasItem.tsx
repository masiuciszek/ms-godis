/* eslint-disable import/extensions */
import * as React from 'react';


interface Props {
  deal: Record<string, any>;

}

const ShowCaseItem: React.FC<Props> = ({ deal }) => (
  <div className="ShowCaseItem">
    <p style={{ margin: '1rem' }}>
      name:
      {' '}
      {deal.product.name}
    </p>
    <p style={{ margin: '1rem' }}>
      {'  '}
      valid from
      --
      {deal.valid_from}
      --
      to
      {deal.valid_to}

    </p>

  </div>
);

export default ShowCaseItem;
