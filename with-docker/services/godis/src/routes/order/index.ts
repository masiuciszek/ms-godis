import * as controllers from '../../controllers/OrderControllers';
import * as auth from '../../middleware/auth';

export default [
  {
    path: '/godisapi/order',
    method: 'post',
    handler: [
      auth.validateConsumer,
      controllers.createOrder,
    ],
  },
  {
    path: '/godisapi/order',
    method: 'get',
    handler: [
      auth.validateAdmin,
      controllers.getAllOrders,
    ],
  },
  {
    path: '/godisapi/order/:id',
    method: 'get',
    handler: [
      auth.validateAdmin,
      controllers.getOrderById,
    ],
  },
  {
    path: '/godisapi/order/consumer/:id',
    method: 'get',
    handler: [
      auth.validateAdmin,
      controllers.getOrderByConsumerId,
    ],
  },
];
