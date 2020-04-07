import { Dispatch } from 'react';
import axios from 'axios';
import {
  IGetProducersAction, ConsumerActionTypes, IAddConsumerAction, IConsumer,
} from './consumer.types';


export const getProducers = () => async (dispatch: Dispatch<IGetProducersAction>) => {
  try {
    const res = await axios.get('/godisapi/producer');
    const data = await res.data;

    dispatch({
      type: ConsumerActionTypes.GET_PRODUCERS,
      payload: data,
    });
  } catch (err) {
    console.error(err);
  }
};


export const addConsumerProfile = (formData: IConsumer) => async (dispatch: Dispatch<IAddConsumerAction>) => {
  try {
    const config = {
      headers: {
        'Content:Type': 'application/json',
      },
    };
    const res = await axios.post('/godisapi/consumer', formData, config);
    dispatch({
      type: ConsumerActionTypes.ADD_CONSUMER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};
