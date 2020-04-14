import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Product } from '../entities/Product';
import { OrderProduct } from '../entities/OrderProduct';
import { Producer } from '../entities/Producer';
import { Order } from '../entities/Order';
import { Consumer } from '../entities/Consumer';
import { HTTP400Error } from '../utils/httpErrors';
import { ProductObject } from '../types';

export async function createProducer(req: Request, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const { name } = req.body;

    const producer = manager.create(Producer, {
      name,
    });
    const savedProducer = await manager.save(producer);

    res.status(200)
    .send({
      message: '200 OK',
      producer: savedProducer,
    })
  });
};

export async function updateProducer(req: Request, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const { name } = req.body;
    const id = Number(req.params.id);

    const producer = await manager.findOne(Producer, id);

    if (!producer) {
      throw new HTTP400Error('No such producer.');
    };

    const updatedProducer = await manager.save(manager.create(Producer, {
      id,
      name,
    }));

    res.status(200)
    .send({
      message: '200 OK',
      producer: updatedProducer,
    });
  });
};

export async function deleteProducer(req: Request, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const id = Number(req.params.id);

    const producer = await manager.findOne(Producer, id);

    if (!producer) {
      throw new HTTP400Error('No such producer.');
    };

    const deletedProducer = await manager.remove(producer);

    res.status(200)
    .send({
      message: '200 OK',
      producer: deletedProducer,
    });
  });
};

export async function createConsumer(req: Request, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const { firstName, lastName, adress } = req.body;

    if (!firstName || !lastName || !adress) {
      throw new HTTP400Error('Missing paramaters in request body.');
    };

    const consumer = manager.create(Consumer, {
      firstName,
      lastName,
      adress,
    });
    const savedConsumer = await manager.save(consumer);

    res.status(200)
    .send({
      message: '200 OK',
      consumer: savedConsumer,
    });
  });
};

export async function updateConsumer(req: Request, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const id = Number(req.params.id);
    const { firstName, lastName, adress } = req.body;

    const consumer = await manager.findOne(Consumer, id);

    if (!consumer) {
      throw new HTTP400Error('No such consumer.');
    };

    const updatedConsumer = await manager.save(manager.create(Consumer, {
      id,
      firstName,
      lastName,
      adress,
    }));

    res.status(200)
    .send({
      message: '200 OK',
      consumer: updatedConsumer,
    });
  });
};

export async function deleteConsumer(req: Request, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const id = Number(req.params.id);

    const consumer = await manager.findOne(Consumer, id);

    if (!consumer) {
      throw new HTTP400Error('No such consumer.');
    };

    const deletedConsumer = await manager.remove(consumer);

    res.status(200)
    .send({
      message: '200 OK',
      consumer: deletedConsumer,
    });
  });
};

export async function createOrder(req: Request, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const { products, consumerId } = req.body;
    
    if (!Array.isArray(products) || products.length < 1 || !consumerId) {
      throw new HTTP400Error('Missing paramaters in request body.');
    };
    
    const consumer = await manager.findOne(Consumer, consumerId);

    const orderProducts = await Promise.all(products.map(async (obj: ProductObject) => {
      const product = await manager.findOne(Product, obj.id);

      return manager.create(OrderProduct, {
        product,
        price: product.price,
        qty: obj.qty,
      });
    }));
    await manager.save(orderProducts);

    const order = manager.create(Order, {
      consumer,
      orderProduct: orderProducts,
    });
    const savedOrder = await manager.save(order);

    res.status(200)
    .send({
      message: '200 OK',
      savedOrder,
    });
  });
};

export async function deleteOrder(req: Request, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const id = Number(req.params.id);

    const order = await manager.findOne(Order, id);

    if (!order) {
      throw new HTTP400Error('No such order.');
    };

    const orderProducts = await manager.find(OrderProduct, {
      where: {
        order,
      },
    });

    const deletedOrderProducts = await manager.remove(orderProducts);

    const deletedOrder = await manager.remove(order);

    res.status(200)
    .send({
      message: '200 OK',
      order: deletedOrder,
      orderProducts: deletedOrderProducts,
    });
  });
};

export async function createProduct(req: Request, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const { name, qty, price, producer } = req.body;

    if (!name || !qty || !price || !producer) {
      throw new HTTP400Error('Missing paramaters in request body.');
    };

    const producerObject = await manager.findOne(Producer, producer);

    if (!producerObject) {
      throw new HTTP400Error('No such producer.');
    };

    const product = await manager.save(manager.create(Product, {
      name,
      qty,
      price,
      producer: producerObject,
    }));

    res.status(200)
    .send({
      message: '200 OK',
      product,
    });
  });
};

export async function updateProduct(req: Request, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const id = Number(req.params.id);

    const { price, qty, name } = req.body;

    const product = await manager.findOne(Product, id);

    if (!product) {
      throw new HTTP400Error('No such product.');
    };

    const updatedProduct = await manager.save(manager.create(Product, {
      id,
      price,
      qty,
      name,
    }));

    res.status(200)
    .send({
      message: '200 OK',
      product: updatedProduct,
    });
  });
};

export async function deleteProduct(req: Request, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const id = Number(req.params.id);

    const product = await manager.findOne(Product, id);

    if (!product) {
      throw new HTTP400Error('No such product.');
    };

    const deletedProduct = await manager.remove(product);
    
    res.status(200)
    .send({
      message: '200 OK',
      product: deletedProduct,
    });
  });
};
