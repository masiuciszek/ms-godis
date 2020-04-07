import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Producer } from '../entities/Producer';
import { HTTP400Error } from '../utils/httpErrors';

export async function getAllProducers(req: Request, res: Response) {
  const id = Number(req.params.id);

  const producerRepository = getRepository(Producer);
  const producers = await producerRepository.find();

  res.status(200)
  .json(producers);
};

export async function getProducerById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const producerRepository = getRepository(Producer);
  const producer = await producerRepository.findOne(id);

  if (!producer) {
    throw new HTTP400Error('No such resource.');
  };

  res.status(200) 
  .json(producer);
}

export async function createProducer(req: Request, res: Response) {
  const { name } = req.body; 

  if (!name) {
    throw new HTTP400Error('Missing paramater in request body.');
  };

  const producer = {
    name
  };

  const producerRepository = getRepository(Producer);
  const savedProducer = await producerRepository.save(producer);

  res.status(200)
  .send({
    message: 'Resource created.',
    producer: savedProducer,
  });
}

export async function updateProducer(req: Request, res: Response) {
  const { name } = req.body
  const id = Number(req.params.id);

  const producerRepository = getRepository(Producer);
  const resourceExists = await producerRepository.findOne(id);

  if (!resourceExists) {
    throw new HTTP400Error('No such resource.');
  };
  
  const producer = {
    id,
    name,
  };

  await producerRepository.save(producer);

  res.status(200)
  .send({
    message: 'Resource updated.'
  });
}

export async function deleteProducer(req: Request, res: Response) {
  const id = Number(req.params.id);

  const producerRepository = getRepository(Producer);
  const producer = await producerRepository.findOne(id);

  if (!producer) {
    throw new HTTP400Error('No such resource.');
  };

  await producerRepository.remove(producer);

  res.status(200)
  .send({
    message: 'Resource deleted.'
  });
};
