/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { connect } from 'react-redux';
import * as H from 'history';
import { AppState } from '../../../redux';
import { selectMyOrders } from '../../../redux/concumer/consumer.selector';
import { getMyOrders, editMyOrder } from '../../../redux/concumer/consumer.actions';


interface Props {
  newOrderState: any;
  myOrders: Record<string, any>[];
  getMyOrders: () => Promise<void>;
  editMyOrder: (id: number, productsData: Record<string, any>[]) => Promise<void>;
  orderId: number;
  history: H.History<any>;
}

const EditOrderForm: React.FC<Props> = ({
  newOrderState, myOrders, getMyOrders, editMyOrder, orderId, history,
}) => {
  const [formData, setFormData] = React.useState<string>('');

  React.useEffect(() => {
    if (newOrderState !== null) {
      getMyOrders();
      setFormData(newOrderState.qty);
    }
  }, [newOrderState, getMyOrders]);


  const handleUpdateOrder = () => {
    const product: any = { id: Number(newOrderState.id), qty: Number(formData) };
    // new order array with the updated QTY
    const products = myOrders.map((x) => x.orderProduct.map((y: any) => {
      const orderProduct = y.id === product.id ? product : y;
      return orderProduct;
    }));

    editMyOrder(orderId, products[0]);
    history.push('/');
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdateOrder();
    setFormData('');
  };


  return (
    <>
      <form id="EditOrderForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="qty">
            <span>Qty: </span>
            <input
              type="text"
              placeholder="qty"
              name="qty"
              value={formData}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Change</button>
      </form>
    </>
  );
};


const mapStateToProps = (state: AppState) => ({
  myOrders: selectMyOrders(state),

});
export default connect(mapStateToProps, { getMyOrders, editMyOrder })(EditOrderForm);
