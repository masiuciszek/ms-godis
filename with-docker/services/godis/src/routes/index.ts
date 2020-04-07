import producer from './producer';
import consumer from './consumer';
import product from './product';
import order from './order';

export default [
  ...order,
  ...product,
  ...producer,
  ...consumer
];
