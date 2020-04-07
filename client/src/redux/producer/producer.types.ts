/* eslint-disable @typescript-eslint/interface-name-prefix */

export interface IProducer{
  id: number;
  name: string;
}

export interface IProduct{
  name: string;
  qty: number;
  price: number;
  producer: IProducer['id'];
}


export interface IProducerState{
  loading: boolean;
  producer: null | IProducer;
  error: null | Record<string, any>;
  orderProduct: null | Record<string, any>; // order product type //TODO:
  deal: null | Record<string, any>; // deal type //TODO:
  products: any;
}


export enum ProducerActionTypes {
  ADD_PRODUCT = 'ADD_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  CREATE_PRODUCER = 'CREATE_PRODUCER',
  GET_PRODUCT_BY_PRODUCER =' GET_PRODUCT_BY_PRODUCER',
}


export interface IAddProductAction {
  type: ProducerActionTypes.ADD_PRODUCT;
  payload: IProduct;
}


export interface ICreateProducerAction {
  type: ProducerActionTypes.CREATE_PRODUCER;
  payload: IProducer; // just the name
}


export interface IGetProductByProducer {
  type: ProducerActionTypes.GET_PRODUCT_BY_PRODUCER;
  payload: IProduct;
}

export interface IDeleteProductAction {
  type: ProducerActionTypes.DELETE_PRODUCT;
  payload: string; // sending id to the reducer
}

export type ProducerTypesReducer =
   IAddProductAction | IDeleteProductAction | ICreateProducerAction | IGetProductByProducer
