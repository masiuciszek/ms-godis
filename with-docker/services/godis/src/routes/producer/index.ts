import * as controllers from '../../controllers/ProducerControllers';

export default [
  {
    path: '/godisapi/producer',
    method: 'get',
    handler: [
      controllers.getAllProducers,
    ],
  },
  {
    path: '/godisapi/producer/:id',
    method: 'get',
    handler: [
      controllers.getProducerById,
    ],
  },
  {
    path: '/godisapi/producer',
    method: 'post',
    handler: [
      controllers.createProducer,
    ],
  },
  {
    path: '/godisapi/producer/:id',
    method: 'put',
    handler: [
      controllers.updateProducer,
    ],
  },
  {
    path: '/godisapi/producer/:id',
    method: 'delete',
    handler: [
      controllers.deleteProducer,
    ],
  },
];
