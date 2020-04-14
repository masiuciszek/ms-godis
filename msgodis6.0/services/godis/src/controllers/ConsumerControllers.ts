import { Response } from 'express';
import { MyRequest, ProductObject } from '../types';
import { getManager } from 'typeorm';
import { Consumer } from '../entities/Consumer';
import { Order } from '../entities/Order';
import { OrderProduct } from '../entities/OrderProduct';
import { Product } from '../entities/Product';
import { HTTP400Error } from '../utils/httpErrors';

export async function getOrders(req: MyRequest, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const consumerId = req.user.godisDbId;
    const consumer = await manager.findOne(Consumer, consumerId);

    const orders = await manager.find(Order, {
      where: {
        consumer,
      },
      relations: ['orderProduct', 'orderProduct.product'],
    });

    res.status(200)
    .send({
      message: '200 OK',
      orders,
    });
  });
};

export async function createOrder(req: MyRequest, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length < 1) {
      throw new HTTP400Error('Missing paramaters in request body.');
    }

    const consumerId = req.user.godisDbId;
    const consumer = await manager.findOne(Consumer, consumerId);

    const orderProduct = await Promise.all(products.map(async (obj: ProductObject) => {
      const product = await manager.findOne(Product, obj.id);

      return manager.create(OrderProduct, {
        product,
        price: product.price,
        qty: obj.qty,
      });
    }));
    await manager.save(orderProduct);

    const order = manager.create(Order, {
      consumer,
      orderProduct,
    });
    const savedOrder = await manager.save(order);

    res.status(200)
    .send({
      message: '200 OK',
      savedOrder,
    });
  });
};
