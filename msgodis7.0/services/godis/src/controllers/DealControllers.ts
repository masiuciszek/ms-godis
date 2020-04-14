import { Response } from 'express';
import { MyRequest } from '../types';
import { getManager } from 'typeorm';
import { Deal } from '../entities/Deals';
import { Product } from '../entities/Product';
import { Producer } from '../entities/Producer';
import { HTTP400Error, HTTP401Error } from '../utils/httpErrors';

export async function createDeal(req: MyRequest, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const { productId, price } = req.body;
    const producerId = req.user.godisDbId;

    if (!productId || !price) {
      throw new HTTP400Error('Missing params in request body.');
    };

    const producer = await manager.findOne(Producer, producerId);

    const isProductByProducer = await manager.findOne(Product, {
      where: {
        id: productId,
        producer,
      },
    });

    if (!isProductByProducer) {
      throw new HTTP401Error('Unauthorized');
    };

    const product = await manager.save(Product, {
      productId,
      price,
    });

    const deal = manager.create(Deal, {
      product,
      producer,
    });
    const savedDeal = await manager.save(deal);

    res.status(200)
    .send({
      message: '200 OK',
      deal: savedDeal,
    });
  });
};

export async function deleteDeal(req: MyRequest, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const dealId = Number(req.params.id);
    const producerId = req.user.godisDbId;

    const producer = await manager.findOne(Producer, producerId);

    const isDealByProducer = await manager.findOne(Deal, {
      where: {
        id: dealId,
        producer,
      },
    });

    if (!isDealByProducer) {
      throw new HTTP401Error('Unauthorized');
    };

    const deal = await manager.findOne(Deal, dealId);

    res.status(200)
    .send({
      message: '200 OK',
      deal,
    });
  });
};
