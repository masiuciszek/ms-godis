/* eslint-disable import/extensions */
import { createSelector } from 'reselect';
import { AppState } from '..';
import { IConsumerState } from './consumer.types';
import { IProduct } from '../shop/shop.types';


const selectProducer = (state: AppState) => state.consumer;
