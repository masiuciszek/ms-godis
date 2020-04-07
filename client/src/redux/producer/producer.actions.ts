/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { Dispatch } from 'react';
import axios from 'axios';
import {
  IProduct, IAddProductAction, ProducerActionTypes, IDeleteProductAction, ICreateProducerAction,
} from './producer.types';


export const createProducer = (
  formData: Record<string, any>,
) => async (dispatch: Dispatch<ICreateProducerAction>) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post('/godisapi/producer', formData, config);

    dispatch({
      type: ProducerActionTypes.CREATE_PRODUCER,
      payload: response.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addNewProduct = (
  product: IProduct,
) => async (dispatch: Dispatch<IAddProductAction>) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/godisapi/product', product, config);

    dispatch({
      type: ProducerActionTypes.ADD_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};


// export const getAllUsers = () => async (dispatch: Dispatch<IGetProducers>) => {
//   try {
//     const res = await axios.get('/godisapi/producer');
//     dispatch({
//       type: ProducerActionTypes.GET_PRODUCERS,
//       payload: res.data,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const deleteProduct = (
  productId: string,
) => async (dispatch: Dispatch<IDeleteProductAction>) => {
  try {
    dispatch({
      type: ProducerActionTypes.DELETE_PRODUCT,
      payload: '',
    });
  } catch (err) {
    console.error(err);
  }
};
