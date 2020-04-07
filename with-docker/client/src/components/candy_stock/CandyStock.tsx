/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import * as React from 'react';
import { connect } from 'react-redux';
import { addNewProduct, IProductFormData } from '../../redux/producer/producer.actions';
import { AppState } from '../../redux';
import { IUserData } from '../../redux/auth/auth.types';


interface Props {
  addNewProduct: (product: IProductFormData) => Promise<void> ;
  user: IUserData | null;
}


const CandyStock: React.FC<Props> = ({ user, addNewProduct }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    price: '',
    qty: '',
  });
  const { name, price, qty } = formData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCandy: IProductFormData = {
      name,
      price: Number(price),
      qty: Number(qty),
      producerName: user?.username,
    };
    addNewProduct(newCandy);
    setFormData({
      name: '',
      price: '',
      qty: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;


    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="CandyStock mt-5">
      <h3 className="display-3">Add a new candy</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Candy name
            <input type="text" className="form-control" id="name" value={name} onChange={handleChange} name="name" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="price">
            Price
            <input type="text" className="form-control" id="price" value={price} onChange={handleChange} name="price" />
          </label>
        </div>
        <div className="form-group">

          <label htmlFor="qty">
            qty
            <input type="text" className="form-control" id="qty" value={qty} onChange={handleChange} name="qty" />
          </label>
        </div>


        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
      </form>

    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { addNewProduct })(CandyStock);
