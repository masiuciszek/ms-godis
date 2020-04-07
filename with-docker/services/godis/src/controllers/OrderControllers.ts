import { Request, Response } from 'express';
import { getRepository, getManager } from 'typeorm';
import { Product } from '../entities/Product';
import { Order } from '../entities/Order';
import { OrderProduct } from '../entities/OrderProduct';
import { Consumer } from '../entities/Consumer';
import { HTTP400Error } from '../utils/httpErrors';

export async function createOrder(req: Request, res: Response) {
  const { orderArr } = req.body;
  // @ts-ignore
  const consumer = Number(req.headers.user.godisDbId);

  if (!consumer || !Array.isArray(orderArr)) {
    throw new HTTP400Error('Missing paramaters in request body.');
  };

  if (orderArr.length < 1) {
    throw new HTTP400Error('No products in product list');
  };

  const entityManager = getManager().transaction(async manager => {
    const consumerObj = await manager.findOne(Consumer, consumer);

    const productList = await Promise.all(orderArr.map(async obj => {
      const product = await manager.findOne(Product, obj.id);

      return manager.create(OrderProduct, {
        product,
        qty: obj.qty,
        price: product.price,
      });
    }));
    await manager.save(productList);

    const order = manager.create(Order, {
      consumer: consumerObj,
      orderProduct: productList,
    });
    await manager.save(order);

    const updatedProductList = await Promise.all(orderArr.map(async obj => {
      const product = await manager.findOne(Product, obj.id);
      product.qty -= obj.qty;
      return product;
    }));
    await manager.save(updatedProductList);
    
    res.status(200)
    .send({
      message: 'Resource created',
      order,
    });
  });
};

export async function getAllOrders(req: Request, res: Response) {
  const orderRepository = getRepository(Order);

  const orders = await orderRepository.find({
    relations: ['orderProduct', 'orderProduct.product', 'consumer'],
  });

  res.status(200)
  .send(orders);
};

export async function getOrderById(req: Request, res: Response) {
  const id = Number(req.params.id);

  console.log(id)

  const orderRepository = getRepository(Order);
  const orders = await orderRepository.findOne({
    where: {
      id,
    },
    relations: ['orderProduct', 'orderProduct.product', 'consumer'],
  });

  if (!orders) {
    throw new HTTP400Error('No such order.');
  }

  res.status(200)
  .send(orders);
};

export async function getOrderByConsumerId(req: Request, res: Response) {
  const id = Number(req.params.id);

  const orderRepository = getRepository(Order);
  const orders = await orderRepository.find({
    where: {
      consumer: {
        id,
      },
    },
    relations: ['orderProduct', 'orderProduct.product', 'consumer'],
  });

  res.status(200)
  .send(orders);
};

export async function updateOrder(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { products } = req.body;

  const orderRepository = getRepository(Order);
  const productRepository = getRepository(Product);
  const orderProductRepository = getRepository(OrderProduct);


}
