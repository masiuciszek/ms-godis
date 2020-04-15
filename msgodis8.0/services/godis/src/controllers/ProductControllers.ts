import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { Producer } from '../entities/Producer';
import { Deal } from '../entities/Deals';
import { HTTP400Error } from '../utils/httpErrors';

export async function getAllProducts(req: Request, res: Response) {
  const productRepository = getRepository(Product);

  const products = await productRepository.find({
    relations: ['producer'],
  });

  res.status(200).json(products);
};

export async function getProductById(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    throw new HTTP400Error('Bad product id.');
  };

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
};

export async function getAllDeals(req: Request, res: Response) {
  const dealRepository = getRepository(Deal)

  const deals = await dealRepository.find({
    relations: ['product'],
  });

  res.status(200)
  .json(deals);
};
