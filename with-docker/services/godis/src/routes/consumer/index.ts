import * as controllers from '../../controllers/ConsumerControllers';

export default [
  {
    path: '/godisapi/consumer',
    method: 'post',
    handler: [
      controllers.createConsumer,
    ],
  },
  {
    path: '/godisapi/consumer',
    method: 'get',
    handler: [
      controllers.findAllConsumers,
    ],
  },
  {
    path: '/godisapi/consumer/:id',
    method: 'get',
    handler: [
      controllers.findConsumerById,
    ],
  },
  {
    path: '/godisapi/consumer/:id',
    method: 'put',
    handler: [
      controllers.updateConsumer,
    ],
  },
  {
    path: '/godisapi/consumer/:id',
    method: 'delete',
    handler: [
      controllers.deleteConsumer,
    ],
  },
];
