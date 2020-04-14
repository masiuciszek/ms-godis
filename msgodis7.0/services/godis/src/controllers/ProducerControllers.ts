import { Response } from 'express';
import { MyRequest } from '../types';
import { getManager } from 'typeorm';
import { Producer } from '../entities/Producer';
import { Product } from '../entities/Product';
import { Deal } from '../entities/Deals';
import { HTTP400Error, HTTP401Error } from '../utils/httpErrors';
import { io } from '../index';

export async function getProducts(req: MyRequest, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const producerId = req.user.godisDbId;
    const producer = await manager.findOne(Producer, producerId);

    const products = await manager.find(Product, {
      where: {
        producer,
      },
    });

    res.status(200).send(products);
  });
};

export async function createProduct(req: MyRequest, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const { name, price, qty } = req.body;

    const producerId = req.user.godisDbId;
    const producer = await manager.findOne(Producer, producerId);
    
    const product = manager.create(Product, {
      name,
      price,
      qty,
      producer
    });
    await manager.save(product);

    res.status(200)
    .send({
      message: 'Resource created.',
      product,
    });
  });
};

export async function updateProduct(req: MyRequest, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const { name, price, qty } = req.body;

    const producerId = req.user.godisDbId;
    const producer = await manager.findOne(Producer, producerId);

    const productId = Number(req.params.id);
    const product = await manager.findOne(Product, {
      where: {
        id: productId,
        producer,
      },
    });

    if (!product) {
      throw new HTTP400Error('No such product.');
    };

    const updatedProduct = await manager.save(Product, {
      id: productId,
      producer,
      name,
      price,
      qty,
    });

    res.status(200)
    .send({
      message: 'Resource updated.',
      updatedProduct,
    })
  })
};

export async function deleteProduct (req: MyRequest, res: Response) {
  const entityManager = await getManager().transaction(async manager => {

    const producerId = Number(req.user.godisDbId);
    const producer = await manager.findOne(Producer, producerId);

    const productId = Number(req.params.id);
    const product = await manager.findOne(Product, {
      where: {
        id: productId,
        producer,
      },
    });

    if (!product) {
      throw new HTTP400Error('No such product.');
    };

    const deletedProduct = await manager.remove(product);

    res.status(200)
    .send({
      message: 'Resource deleted.',
      deletedProduct,
    });
  });
};

export async function getDeals(req: MyRequest, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const producerId = req.user.godisDbId;

    const deals = await manager.find(Deal, {
      relations: ['product'],
    });

    res.status(200)
    .json(deals);
  })
}

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
      id: productId,
      price,
    });
    const deal = manager.create(Deal, {
      product,
      producer,
    });
    const savedDeal = await manager.save(deal);

    io.of('/socket').emit('newDeal', { message: 'NEW DEAL'});

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
    const { newPrice } = req.body;

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

    const deal = await manager.findOne(Deal, {
      where: {
        id: dealId,
      },
      relations: ['product']
    });

    const product = await manager.findOne(Product, deal.product)
    product.price = newPrice;

    await manager.remove(deal);
    await manager.save(product);

    res.status(200)
    .send({
      message: '200 OK',
      deal,
      product,
    });
  });
};
