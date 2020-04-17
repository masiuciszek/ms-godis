import producer from './producer';
import consumer from './consumer';
import product from './product';
import admin from './admin';

export default [
  ...admin,
  ...product,
  ...producer,
  ...consumer
];
