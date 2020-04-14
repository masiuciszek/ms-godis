/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import { IProducer } from '../producer/producer.types';

export interface IProduct{
  id: number;
  name: string;
  qty: number;
  price: number;
  producer: IProducer;
}

export interface IRandomOrder {
  orders: IProduct[];
}

export interface IShopState {
  products: IProduct[];
  isLoading: boolean;
  error: Record<string, any> | null;
  filteredProducts: null | IProduct[];
  randomProducts: IProduct[] | null;
}


export enum ActionTypesShop{
  GET_PRODUCTS = 'GET_PRODUCTS',
  GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR',
  SEARCH_BY_PRODUCER='SEARCH_BY_PRODUCER',
  CLEAR_SEARCH='CLEAR_SEARCH',
  FILTER_PRODUCTS = 'FILTER_PRODUCTS',
  CLEAR_FILTER_PRODUCTS='CLEAR_FILTER_PRODUCTS',

}


export interface IGetProductsAction {
  type: ActionTypesShop.GET_PRODUCTS;
  payload: IProduct[];
}


export interface IGetErrorAction {
  type: ActionTypesShop.GET_PRODUCTS_ERROR;
  payload: Record<string, any>;
}

export interface ISearchAction {
  type: ActionTypesShop.SEARCH_BY_PRODUCER;
  payload: string;
}

export interface IClearSearchAction {
  type: ActionTypesShop.CLEAR_SEARCH;
}

export interface ISearchProductAction {
  type: ActionTypesShop.FILTER_PRODUCTS;
  payload: string;
}


export type ShopActionTypes =
  IGetProductsAction |
  IGetErrorAction |
  ISearchAction |
  IClearSearchAction|
  ISearchProductAction
