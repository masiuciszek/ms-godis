/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { connect } from 'react-redux';
import { IProductUpdateFormData } from '../../redux/producer/producer.types';
import { updateProduct, clearCurrent, getProductsByProducer } from '../../redux/producer/producer.actions';
import { IProduct } from '../../redux/shop/shop.types';

interface Props {
  current: null | IProduct;
  updateProduct: (formData: IProductUpdateFormData) => Promise<void>;
  toggle: () => void;
  clearCurrent: () => void;
  getProductsByProducer: () => Promise<void>;
}

const EditForm: React.FC<Props> = ({
  current, updateProduct, toggle, clearCurrent, getProductsByProducer,
}) => {
  const [formData, setFormData] = React.useState({
    name: '',
    qty: '',
    price: '',
  });

  const { name, qty, price } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedProduct = {
      id: current?.id,
      name: name || current?.name,
      qty: qty ? Number(qty) : current?.qty,
      price: price ? Number(price) : current?.price,
    };

    updateProduct(updatedProduct);
    setFormData({
      name: '',
      qty: '',
      price: '',
    });
    getProductsByProducer();
    clearCurrent();
    toggle();
  };

  return (
    <form onSubmit={handleSubmit} className="Edit-form">
      <div className="form-group">
        <label htmlFor="name">
          <strong>
            Name:
            {' '}
            { current && current.name}
          </strong>
          <input
            type="text"
            className="form-control"
            value={name}
            name="name"
            placeholder={current?.name.toString()}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="qty">
          <strong>
            Qty:
            {' '}
            {current && current.qty.toString()}
          </strong>
          <input
            type="text"
            className="form-control"
            value={qty}
            name="qty"
            placeholder={current?.qty.toString()}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="price">
          <strong>
            Price:
            {' '}
            {current && current.price.toString()}
          </strong>
          <input
            type="text"
            className="form-control"
            value={price}
            name="price"
            placeholder={current?.price.toString()}
            onChange={handleChange}
          />
        </label>
      </div>

      <button type="submit" className="btn btn-primary">Update</button>
    </form>
  );
};


export default connect(null, { updateProduct, clearCurrent, getProductsByProducer })(EditForm);
