import * as controllers from '../../controllers/ConsumerControllers';
import { validateConsumer } from '../../controllers/AuthControllers';

export default [
  {
    path: '/godisapi/consumer',
    method: 'post',
    handler: [
      validateConsumer,
      controllers.createOrder,
    ],
  },
  {
    path: '/godisapi/consumer',
    method: 'get',
    handler: [
      validateConsumer,
      controllers.getOrders,
    ],
  },
];
