/* eslint-disable import/extensions */
import { Dispatch } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  IGetMyOrdersAction, IDeleteMyOrderActions, ConsumerActionTypes, IEditMyOrderAction,
} from './consumer.types';


export const getMyOrders = () => async (dispath: Dispatch<IGetMyOrdersAction>) => {
  try {
    let token: any;
    if (Cookies.get('token')) {
      token = Cookies.get('token');
    }
    const response = await axios({
      method: 'GET',
      url: '/godisapi/consumer',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispath({
      type: ConsumerActionTypes.GET_MY_ORDERS,
      payload: response.data.orders,
    });
  } catch (err) {
    console.log(err);
  }
};


export const editMyOrder = (id: number, order: Record<string, any>[]) => async (dispath: Dispatch<IEditMyOrderAction>) => {
  try {
    let token: any;
    if (Cookies.get('token')) {
      token = Cookies.get('token');
    }
    const response = await axios({
      method: 'PUT',
      url: `/godisapi/consumer/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: order,
    });

    dispath({
      type: ConsumerActionTypes.EDIT_MY_ORDER,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};


export const deleteMyOrder = (id: number) => async (dispath: Dispatch<IDeleteMyOrderActions>) => {
  try {
    let token: any;
    if (Cookies.get('token')) {
      token = Cookies.get('token');
    }
    await axios({
      method: 'DELETE',
      url: `/godisapi/consumer/${id.toString()}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispath({
      type: ConsumerActionTypes.DELETE_MY_ORDERS,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};
