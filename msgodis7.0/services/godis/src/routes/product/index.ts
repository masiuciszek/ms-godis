import * as controllers from '../../controllers/ProductControllers';

export default [
  {
    path: '/godisapi/product',
    method: 'get',
    handler: [
      controllers.getAllProducts,
    ],
  },
  {
    path: '/godisapi/product/deals',
    method: 'get',
    handler: [
      controllers.getAllDeal,
    ],
  },
  {
    path: '/godisapi/product/:id',
    method: 'get',
    handler: [
      controllers.getProductById,
    ],
  },
  {
    path: '/godisapi/product/producer/:producer',
    method: 'get',
    handler: [
      controllers.getProductByProducer,
    ],
  },
];
