import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { Producer } from '../entities/Producer';
import { HTTP400Error } from '../utils/httpErrors';

export async function getAllProducts(req: Request, res: Response) {
  const productRepository = getRepository(Product);

  const products = await productRepository.find({ relations: ['producer'] });

  res.status(200).json(products);
}

export async function getProductById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const productRepository = getRepository(Product);
  const product = await productRepository.findOne({
    where: {
      id,
    },
    relations: ['producer'],
  });

  if (!product) {
    throw new HTTP400Error('No such product.');
  }

  res.status(200).json(product);
}

export async function getProductByProducer(req: Request, res: Response) {
  const { producer } = req.params;

  const productRepository = getRepository(Product);
  const producerRepository = getRepository(Producer);

  const producerId = await producerRepository.findOne({
    where: { name: producer },
  });

  if (!producerId) {
    throw new HTTP400Error('No such producer.');
  }

  const products = await productRepository.find({
    relations: ['producer'],
    where: {
      producer: { id: producerId.id },
    },
  });

  res.status(200).json(products);
}

export async function createProduct(req: Request, res: Response) {
  const { name, producerName, qty, price } = req.body;

  if (!name || !producerName) {
    throw new HTTP400Error('Missing paramaters in request body.');
  }

  const producerRepository = getRepository(Producer);
  const productRepository = getRepository(Product);

  const producer = await producerRepository.findOne({
    where: {
      name: producerName,
    },
  });

  if (!producer) {
    throw new HTTP400Error('No such producer.');
  }

  const savedProduct = await productRepository.save({
    name,
    producer,
    qty,
    price
  });

  res.status(200).send({
    message: 'Resource created',
    product: savedProduct,
  });
}

export async function updateProduct(req: Request, res: Response) {
  const { name, qty, price } = req.body;
  const id = Number(req.params.id);

  const productRepository = getRepository(Product);
  const product = await productRepository.findOne(id);

  if (!product) {
    throw new HTTP400Error('No such product.');
  }

  const resource = await productRepository.save({
    id,
    name,
    qty,
    price,
  });

  res.status(200).send({
    message: 'Resource updated',
    resource,
  });
}

export async function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);

  const productRepository = getRepository(Product);
  const product = await productRepository.findOne(id);

  if (!product) {
    throw new HTTP400Error('No such product.');
  }

  const resource = await productRepository.remove(product);

  res.status(200).send({
    message: 'Resource deleted.',
    resource,
  });
}
