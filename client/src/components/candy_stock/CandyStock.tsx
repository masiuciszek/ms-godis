import * as React from 'react';

import { connect } from 'react-redux';
import { addNewProduct } from '../../redux/producer/producer.actions';
import { IProduct } from '../../redux/producer/producer.types';

interface Props {
  addNewProduct: Function;
}

const CandyStock: React.FC<Props> = ({ addNewProduct }) => {
  const [formData, setformData] = React.useState<IProduct>({
    name: '',
    qty: 0,
    price: 0,
    producer: 1,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct = {
      name: formData.name,
      qty: Number(formData.qty),
      price: Number(formData.price),
      producer: Number(formData.producer),
    };
    console.log(newProduct);
    addNewProduct(newProduct);


    // clear form after submit
    setformData({
      name: '',
      qty: 0,
      price: 0,
      producer: 0,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;


    setformData({ ...formData, [name]: value });
  };

  return (
    <div className="CandyStock">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Candy name
            <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} name="name" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="price">
            Price
            <input type="text" className="form-control" id="price" value={formData.price} onChange={handleChange} name="price" />
          </label>
        </div>
        <div className="form-group">

          <label htmlFor="qty">
            qty
            <input type="text" className="form-control" id="qty" value={formData.qty} onChange={handleChange} name="qty" />
          </label>
        </div>
        <div className="form-group">

          <label htmlFor="producer">
            producer
            <input type="text" className="form-control" value={formData.producer} id="producer" onChange={handleChange} name="producer" />
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
      </form>

    </div>
  );
};


export default connect(null, { addNewProduct })(CandyStock);
