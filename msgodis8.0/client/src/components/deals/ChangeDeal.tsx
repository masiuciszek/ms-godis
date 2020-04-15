/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable import/extensions */
import * as React from 'react';
import { connect } from 'react-redux';
import { deleteDeal } from '../../redux/producer/producer.actions';


interface Props {
  deleteDeal: (dealId: number, newPrice: number) => Promise<void>;
  dealId: number;
  toggle: () => void;

}

const ChangeDeal: React.FC<Props> = ({
  dealId, deleteDeal, toggle,
}) => {
  const [newPrice, setNewPrice] = React.useState<string>('');


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteDeal(dealId, Number(newPrice));
    toggle();
    setNewPrice('');
  };


  return (
    <form onSubmit={handleSubmit} id="Delete-deal-form">
      <input
        type="text"
        id="Deal-input"
        placeholder="newPrice"
        name="newPrice"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPrice(e.target.value)}
      />
      <button type="submit">Change</button>
    </form>
  );
};

export default connect(null, { deleteDeal })(ChangeDeal);
