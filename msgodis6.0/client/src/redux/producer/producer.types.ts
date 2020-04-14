/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import { IProduct } from '../shop/shop.types';

export interface IProductUpdateFormData {
  id: number | undefined;
  name?: string;
  qty?: number;
  price?: number;
}
export interface IProducer{
  id: number;
  name: string;
}

export interface IDeal { // interface for det producers deal
  productId: number;
  price: number;
}

export interface IDealProduct{
  id: number;
  created_at: Date;
  name: string;
  qty: number;
  price: number;
}

// type for when fetching all producer deals
export interface IDealData{
  id: number;
  valid_from: Date;
  valid_to: Date;
  product: IDealProduct;
}

export interface IProducerState{
  loading: boolean;
  error: null | Record<string, any>;
  products: [] | IProduct[];
  current: null | IProduct;
  currentDeal: null | IDeal;
  deals: IDealData[];
  // productDeals: IDealData[];
}


export enum ProducerActionTypes {
  ADD_PRODUCT = 'ADD_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  GET_PRODUCTS_BY_PRODUCER ='GET_PRODUCTS_BY_PRODUCER',
  GET_PRODUCER_DEALS ='GET_PRODUCER_DEALS',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  SET_CURRENT = 'SET_CURRENT',
  CLEAR_CURRENT = 'CLEAR_CURRENT',
  CREATE_DEAL = 'CREATE_DEAL',
  DELETE_DEAL = 'DELETE_DEAL',
  HANDLE_ERROR='HANDLE_ERROR',
  SET_DEAL = 'SET_DEAL',
  CLEAR_DEAL = 'CLEAR_DEAL',
}


export interface IAddProductAction {
  type: ProducerActionTypes.ADD_PRODUCT;
  payload: IProduct;
}


export interface IGetProductsByProducer {
  type: ProducerActionTypes.GET_PRODUCTS_BY_PRODUCER;
  payload: IProduct[];
}
export interface ICreateDealAction {
  type: ProducerActionTypes.CREATE_DEAL;
  payload: IDeal;
}


export interface IDeleteDealAction {
  type: ProducerActionTypes.DELETE_DEAL;
  payload: number ; // sending id
}


export interface IDeleteProductAction {
  type: ProducerActionTypes.DELETE_PRODUCT;
  payload: number;
}

export interface IUpdateProductAction {
  type: ProducerActionTypes.UPDATE_PRODUCT;
  payload: IProductUpdateFormData;
}

export interface ISetCurrent {
  type: ProducerActionTypes.SET_CURRENT;
  payload: IProduct;
}

export interface IClearCurrent {
  type: ProducerActionTypes.CLEAR_CURRENT;
}
export interface ISetDeal {
  type: ProducerActionTypes.SET_DEAL;
  payload: IDeal;
}

export interface IClearDeal {
  type: ProducerActionTypes.CLEAR_DEAL;
}


export interface IHandleErrorAction {
  type: ProducerActionTypes.HANDLE_ERROR;
  payload: Record<string, any>;
}

export interface IGetProducerDeals {
  type: ProducerActionTypes.GET_PRODUCER_DEALS;
  payload: IDealData[];
}


export type ProducerTypesReducer =
   IAddProductAction |
   IDeleteProductAction |
   IGetProductsByProducer |
   ISetCurrent |
   IClearCurrent|
   IUpdateProductAction|
   ICreateDealAction|
   IDeleteDealAction|
   ISetDeal|
   IClearDeal|
   IGetProducerDeals|
   IHandleErrorAction;
