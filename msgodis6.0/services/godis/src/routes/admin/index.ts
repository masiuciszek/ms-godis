import * as controllers from '../../controllers/AdminControllers';
import { validateAdmin } from '../../controllers/AuthControllers';

export default [
  {
    path: '/godisapi/admin/consumer',
    method: 'post',
    handler: [
      validateAdmin,
      controllers.createConsumer,
    ],
  },
  {
    path: '/godisapi/admin/consumer/:id',
    method: 'put',
    handler: [
      validateAdmin,
      controllers.updateConsumer,
    ],
  },
  {
    path: '/godisapi/admin/consumer/:id',
    method: 'delete',
    handler: [
      validateAdmin,
      controllers.deleteConsumer,
    ],
  },
  {
    path: '/godisapi/admin/producer',
    method: 'post',
    handler: [
      validateAdmin,
      controllers.createProducer,
    ],
  },
  {
    path: '/godisapi/admin/producer/:id',
    method: 'put',
    handler: [
      validateAdmin,
      controllers.updateProducer,
    ],
  },
  {
    path: '/godisapi/admin/producer/:id',
    method: 'delete',
    handler: [
      validateAdmin,
      controllers.deleteProducer,
    ],
  },
  {
    path: '/godisapi/admin/product',
    method: 'post',
    handler: [
      validateAdmin,
      controllers.createProduct,
    ],
  },
  {
    path: '/godisapi/admin/product/:id',
    method: 'put',
    handler: [
      validateAdmin,
      controllers.updateProduct,
    ],
  },
  {
    path: '/godisapi/admin/product/:id',
    method: 'delete',
    handler: [
      validateAdmin,
      controllers.deleteProduct,
    ],
  },
  {
    path: '/godisapi/admin/order',
    method: 'post',
    handler: [
      validateAdmin,
      controllers.createOrder,
    ],
  },
  {
    path: '/godisapi/admin/order/:id',
    method: 'delete',
    handler: [
      validateAdmin,
      controllers.deleteOrder,
    ],
  },
];
