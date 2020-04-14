/* eslint-disable import/extensions */
import { Dispatch } from 'react';
import axios from 'axios';
import {
  IGetProductsAction, ActionTypesShop,
  IGetErrorAction, ISearchAction,
  IClearSearchAction,
  ISearchProductAction,
} from './shop.types';


export const handleError = (
  err: Record<string, any>,
): IGetErrorAction => ({ type: ActionTypesShop.GET_PRODUCTS_ERROR, payload: err });

export const getAllProducts = () => async (dispath: Dispatch<IGetProductsAction>) => {
  try {
    const response = await axios.get('/godisapi/product');
    dispath({
      type: ActionTypesShop.GET_PRODUCTS,
      payload: response.data,
    });
  } catch (err) {
    handleError(err);
  }
};

export const getCollectionError = (message: Record<string, any>): IGetErrorAction => ({
  type: ActionTypesShop.GET_PRODUCTS_ERROR,
  payload: message,
});


// For the search bar in Home Component
export const searchByProducer = (
  producerName: string,
) => async (dispath: Dispatch<ISearchAction>) => {
  try {
    const response = await axios.get(`/godisapi/product/producer/${producerName}`);
    dispath({
      type: ActionTypesShop.SEARCH_BY_PRODUCER,
      payload: response.data,
    });
  } catch (err) {
    handleError(err);
  }
};


export const clearSearch = (): IClearSearchAction => ({
  type: ActionTypesShop.CLEAR_SEARCH,
});


export const searchByProduct = (
  text: string,
): ISearchProductAction => ({ type: ActionTypesShop.FILTER_PRODUCTS, payload: text });
