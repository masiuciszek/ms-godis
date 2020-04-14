/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import * as React from 'react';
import { IDealData } from '../../redux/producer/producer.types';
import useToggle from '../../hooks/useToggle';
import ChangeDeal from './ChangeDeal';

interface Props {
  deal: IDealData;
}

const DealItem: React.FC<Props> = ({ deal }) => {
  const [showForm, toggleForm] = useToggle(false);
  const [dealId, setDealId] = React.useState<number>(0);

  const handleToggle = (id: number): void => {
    toggleForm();
    setDealId(id);
  };

  return (
    <>
      <div className="DealItem">
        <p>
          Product:
          {' '}
          <span>{deal.product.name}</span>
        </p>
        <p>
          Deal Price:
          {' '}
          <span>{deal.product.price}</span>
        </p>
        <p>
          from:
          {' '}
          <span>{deal.valid_from}</span>
        </p>
        <p>
          to:
          {' '}
          <span>{deal.valid_to}</span>
        </p>

        <div className="deal-options">
          <span onClick={() => handleToggle(deal.id)}>&#x270E;</span>
        </div>
      </div>
      {showForm && <ChangeDeal toggle={toggleForm} dealId={dealId} />}
    </>
  );
};
export default DealItem;
