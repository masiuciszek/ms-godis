import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Consumer } from '../entities/Consumer';
import { HTTP400Error } from '../utils/httpErrors';

export async function findAllConsumers(req: Request, res: Response) {
  const consumerRepository = getRepository(Consumer);
  const consumers = await consumerRepository.find();

  console.log(req.cookies)

  res.status(200)
  .json(consumers);
};

export async function findConsumerById(req: Request, res: Response) {
  const { id } = req.params;

  const consumerRepository = getRepository(Consumer);
  const consumer = await consumerRepository.findOne(id);

  if (!consumer) {
    throw new HTTP400Error('No such resource.')
  }

  res.status(200)
  .json(consumer)
};

export async function createConsumer(req: Request, res: Response) {
  const { firstName, lastName, adress } = req.body

  if (!firstName || !lastName || !adress) {
    throw new HTTP400Error('Missing paramaters in request body.');
  };

  const consumerRepository = getRepository(Consumer);
  const consumer = {
    firstName,
    lastName,
    adress
  };
  
  const savedConsumer = await consumerRepository.save(consumer);

  res.status(200)
  .send({
    message: 'Resource created.',
    consumer: savedConsumer,
  })
};

export async function updateConsumer(req: Request, res: Response) {
  const consumerRepository = getRepository(Consumer);
  const id = Number(req.params.id);
  const consumer = {
    id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    adress: req.body.adress
  };

  const resourceExists = await consumerRepository.findOne(id);

  if (!resourceExists) {
    throw new HTTP400Error('No such resource.');
  };

  await consumerRepository.save(consumer);

  res.status(200)
  .send({
    message: 'Resource updated.'
  });
};

export async function deleteConsumer(req: Request, res: Response) {
  const id = Number(req.params.id);

  const consumerRepository = getRepository(Consumer);
  const consumer = await consumerRepository.findOne(id);

  if (!consumer) {
    throw new HTTP400Error('No such resource.');
  }
  await consumerRepository.remove(consumer);

  res.status(200)
  .send({
    message: 'Resource deleted.'
  });
};
