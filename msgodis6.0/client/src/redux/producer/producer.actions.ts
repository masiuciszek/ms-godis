/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { Dispatch } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { IProduct } from '../shop/shop.types';
import {
  IAddProductAction,
  ProducerActionTypes, IDeleteProductAction,
  ISetCurrent,
  IProductUpdateFormData,
  IUpdateProductAction,
  IClearCurrent,
  IGetProductsByProducer,
  IDeal,
  ICreateDealAction,
  IHandleErrorAction,
  IDeleteDealAction,
  ISetDeal,
  IClearDeal,
  IGetProducerDeals,
} from './producer.types';


export interface IProductFormData { // type when adding a new product in candy shop component
  name: string;
  price: number;
  qty: number;
  producerName: string | undefined;
}

export const handleError = (error: Record<string, any>): IHandleErrorAction => (
  { type: ProducerActionTypes.HANDLE_ERROR, payload: error });

export const addNewProduct = (
  product: IProductFormData,
) => async (dispatch: Dispatch<IAddProductAction>) => {
  let token: any;
  if (Cookies.get('token')) {
    token = Cookies.get('token');
  }

  try {
    const res = await axios({
      method: 'POST',
      url: '/godisapi/producer',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: product,
    });

    dispatch({
      type: ProducerActionTypes.ADD_PRODUCT,
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
    let token: any;
    if (Cookies.get('token')) {
      token = Cookies.get('token');
    }

    const res = await axios({
      method: 'PUT',
      url: `/godisapi/producer/${formData.id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    });

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
    let token: any;
    if (Cookies.get('token')) {
      token = Cookies.get('token');
    }
    console.log('dealId is ', productId, ' nad a type of ', typeof productId, ' and token is ', token);
    await axios({
      method: 'DELETE',
      url: `/godisapi/producer/${productId.toString()}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: ProducerActionTypes.DELETE_PRODUCT,
      payload: productId,
    });
  } catch (err) {
    console.error(err);
  }
};


export const getProductsByProducer = () => async (dispatch: Dispatch<IGetProductsByProducer>) => {
  try {
    let token: any;
    if (Cookies.get('token')) {
      token = Cookies.get('token');
    }
    const response = await axios({
      method: 'GET',
      url: '/godisapi/producer',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: ProducerActionTypes.GET_PRODUCTS_BY_PRODUCER,
      payload: response.data,
    });
  } catch (err) {
    console.error(err);
  }
};


export const setDeal = (deal: IDeal): ISetDeal => (
  { type: ProducerActionTypes.SET_DEAL, payload: deal }
);
export const clearDeal = (): IClearDeal => (
  { type: ProducerActionTypes.CLEAR_DEAL }
);

export const createDeal = (dealOptions: IDeal) => async (dispatch: Dispatch<ICreateDealAction>) => {
  try {
    let token: any;
    if (Cookies.get('token')) {
      token = Cookies.get('token');
    }
    const response = await axios({
      method: 'POST',
      url: '/godisapi/producer/deal',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: dealOptions,
    });
    dispatch({
      type: ProducerActionTypes.CREATE_DEAL,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteDeal = (
  dealId: number, newPrice: number,
) => async (dispatch: Dispatch<IDeleteDealAction>) => {
  try {
    let token: any;
    if (Cookies.get('token')) {
      token = Cookies.get('token');
    }


    await axios({
      method: 'PUT',
      url: `/godisapi/producer/deal/${dealId.toString()}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: newPrice,
    });


    dispatch({
      type: ProducerActionTypes.DELETE_DEAL,
      payload: dealId,
    });
  } catch (err) {
    console.log(err);
  }
};


export const getProducerDeals = () => async (dispatch: Dispatch<IGetProducerDeals>) => {
  try {
    let token: any;
    if (Cookies.get('token')) {
      token = Cookies.get('token');
    }
    const response = await axios({
      method: 'GET',
      url: '/godisapi/producer/deal',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: ProducerActionTypes.GET_PRODUCER_DEALS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};
