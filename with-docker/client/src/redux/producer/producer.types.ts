/* eslint-disable @typescript-eslint/interface-name-prefix */


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

export interface IProduct{
  id: number;
  name: string;
  qty: number;
  price: number;
  producer: IProducer;
  // producer: IProducer['id'];
}


export interface IProducerState{
  loading: boolean;
  error: null | Record<string, any>;
  products: [] | any; // this type need to be fixed
  current: null | IProduct;
}


export enum ProducerActionTypes {
  ADD_PRODUCT = 'ADD_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  GET_PRODUCT_BY_PRODUCER ='GET_PRODUCT_BY_PRODUCER',
  GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  SET_CURRENT = 'SET_CURRENT',
  CLEAR_CURRENT = 'CLEAR_CURRENT',
}


export interface IAddProductAction {
  type: ProducerActionTypes.ADD_PRODUCT;
  payload: IProduct;
}


export interface IGetProductByProducer {
  type: ProducerActionTypes.GET_PRODUCT_BY_PRODUCER;
  payload: IProduct;
}

export interface IGetAllProducts {
  type: ProducerActionTypes.GET_ALL_PRODUCTS;
  payload: IProduct;
}
export interface IDeleteProductAction {
  type: ProducerActionTypes.DELETE_PRODUCT;
  payload: number; // sending id to the reducer
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


export type ProducerTypesReducer =
   IAddProductAction |
   IDeleteProductAction |
   IGetProductByProducer |
   IGetAllProducts |
   ISetCurrent |
   IClearCurrent|
   IUpdateProductAction
