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
      product.qty -= obj.qty;
      await manager.save(product);

      if (!product) {
        throw new HTTP400Error('Bad product id');
      };

      return manager.create(OrderProduct, {
        product,
        price: product.price,
        qty: obj.qty,
      });
    }));
    await manager.save(orderProduct);

    const total = orderProduct.reduce((acc, item) => {
      return acc += (item.qty * item.price);
    }, 0)

    const order = manager.create(Order, {
      consumer,
      orderProduct,
      total,
    });
    const savedOrder = await manager.save(order);

    res.status(200)
    .send({
      message: '200 OK',
      savedOrder,
    });
  });
};

export async function deleteOrder(req: MyRequest, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const orderId = Number(req.params.id);

    const consumerId = req.user.godisDbId;
    const consumer = await manager.findOne(Consumer, consumerId);

    const order = await manager.findOne(Order, {
      where: {
        id: orderId,
        consumer,
      }
    });

    if (!order) {
      throw new HTTP400Error('No such order.');
    };

    const orderProducts = await manager.find(OrderProduct, {
      where: {
        order,
      },
      relations: ['product']
    });

    const updatedProducts = await Promise.all(orderProducts.map(async obj => {
      const product = await manager.findOne(Product, obj.product);
      product.qty += obj.qty;
      await manager.save(product);
      return
    }))

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

export async function updateOrder(req: MyRequest, res: Response) {
  const entityManager = await getManager().transaction(async manager => {
    const orderId = Number(req.params.id);

    const { products } = req.body;

    if (!Array.isArray(products) || products.length < 1) {
      throw new HTTP400Error('Missing paramaters in request body.');
    };

    const consumerId = req.user.godisDbId;
    const consumer = await manager.findOne(Consumer, consumerId);

    const order = await manager.findOne(Order, {
      where: {
        id: orderId,
        consumer,
      }
    });

    if (!order) {
      throw new HTTP400Error('No such order.');
    };

    const orderProducts = await manager.find(OrderProduct, {
      where: {
        order,
      },
      relations: ['product'],
    });
    
    const updatedProducts = await Promise.all(orderProducts.map(async obj => {
      const product = await manager.findOne(Product, obj.product);
      product.qty += obj.qty;
      await manager.save(product);
      return
    }))

    const deletedOrderProducts = await manager.remove(orderProducts);

    const newOrderProducts = await Promise.all(products.map(async (obj: ProductObject) => {
      const product = await manager.findOne(Product, obj.id);

      if (!product) {
        throw new HTTP400Error('Bad product id');
      };

      product.qty -= obj.qty;
      await manager.save(product);

      return manager.create(OrderProduct, {
        product,
        price: product.price,
        qty: obj.qty,
      });
    }));
    await manager.save(newOrderProducts);

    const total = newOrderProducts.reduce((acc, item) => {
      return acc += (item.qty * item.price);
    }, 0)

    const newOrder = manager.create(Order, {
      id: orderId,
      orderProduct: newOrderProducts, 
      total,
    })
    await manager.save(newOrder);

    res.status(200)
    .send({
      message: '200 OK',
      order: newOrder,
      products: newOrderProducts,
    });
  });
};

