/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { Dispatch } from 'react';
import axios from 'axios';
import {
  IAddProductAction,
  ProducerActionTypes, IDeleteProductAction,
  IGetAllProducts,
  IProduct,
  ISetCurrent,
  IProductUpdateFormData,
  IUpdateProductAction,
  IClearCurrent,
} from './producer.types';


export interface IProductFormData { // type when adding a new product in candy shop component
  name: string;
  price: number;
  qty: number;
  producerName: string | undefined;
}

export const addNewProduct = (
  product: IProductFormData,
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


export const getAllProducts = () => async (dispatch: Dispatch<IGetAllProducts>) => {
  try {
    const res = await axios.get('/godisapi/product');
    dispatch({
      type: ProducerActionTypes.GET_ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};


export const setCurrent = (product: IProduct): ISetCurrent => ({
  type: ProducerActionTypes.SET_CURRENT,
  payload: product,
});

export const clearCurrent = (): IClearCurrent => ({
  type: ProducerActionTypes.CLEAR_CURRENT,
});

export const updateProduct = (
  formData: IProductUpdateFormData,
) => async (dispatch: Dispatch<IUpdateProductAction>) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`/godisapi/product/${formData.id}`, formData, config);

    dispatch({
      type: ProducerActionTypes.UPDATE_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};


export const deleteProduct = (
  productId: number,
) => async (dispatch: Dispatch<IDeleteProductAction>) => {
  try {
    await axios.delete(`/godisapi/product/${productId.toString()}`);

    dispatch({
      type: ProducerActionTypes.DELETE_PRODUCT,
      payload: productId,
    });
  } catch (err) {
    console.error(err);
  }
};
