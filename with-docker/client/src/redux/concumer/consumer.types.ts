/* eslint-disable @typescript-eslint/interface-name-prefix */
import { IProducer } from '../producer/producer.types';

export interface IConsumer {
  // id: number;
  firstName: string;
  lastName: string;
  adress: string;
  order?: any; // this will be the order type, array of type orders
}

export interface IConsumerState{
  loading: boolean;
  consumer: null | IConsumer;
  producers: IProducer[] | [];
  error: null | Record<string, any>;
}

export enum ConsumerActionTypes {
  GET_PRODUCERS = 'GET_PRODUCERS',
  ADD_CONSUMER_PROFILE = 'ADD_CONSUMER_PROFILE',
}


export interface IGetProducersAction {
  type: ConsumerActionTypes.GET_PRODUCERS;
  payload: IProducer[];
}
export interface IAddConsumerAction {
  type: ConsumerActionTypes.ADD_CONSUMER_PROFILE;
  payload: IConsumer;
}

export type ConsumerReducerType = IGetProducersAction | IAddConsumerAction
