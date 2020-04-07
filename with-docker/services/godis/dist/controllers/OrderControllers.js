"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Product_1 = require("../entities/Product");
const Order_1 = require("../entities/Order");
const OrderProduct_1 = require("../entities/OrderProduct");
const Consumer_1 = require("../entities/Consumer");
const httpErrors_1 = require("../utils/httpErrors");
function createOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orderArr } = req.body;
        // @ts-ignore
        const consumer = Number(req.headers.user.godisDbId);
        if (!consumer || !Array.isArray(orderArr)) {
            throw new httpErrors_1.HTTP400Error('Missing paramaters in request body.');
        }
        ;
        if (orderArr.length < 1) {
            throw new httpErrors_1.HTTP400Error('No products in product list');
        }
        ;
        const entityManager = typeorm_1.getManager().transaction((manager) => __awaiter(this, void 0, void 0, function* () {
            const consumerObj = yield manager.findOne(Consumer_1.Consumer, consumer);
            const productList = yield Promise.all(orderArr.map((obj) => __awaiter(this, void 0, void 0, function* () {
                const product = yield manager.findOne(Product_1.Product, obj.id);
                return manager.create(OrderProduct_1.OrderProduct, {
                    product,
                    qty: obj.qty,
                    price: product.price,
                });
            })));
            yield manager.save(productList);
            const order = manager.create(Order_1.Order, {
                consumer: consumerObj,
                orderProduct: productList,
            });
            yield manager.save(order);
            const updatedProductList = yield Promise.all(orderArr.map((obj) => __awaiter(this, void 0, void 0, function* () {
                const product = yield manager.findOne(Product_1.Product, obj.id);
                product.qty -= obj.qty;
                return product;
            })));
            yield manager.save(updatedProductList);
            res.status(200)
                .send({
                message: 'Resource created',
                order,
            });
        }));
    });
}
exports.createOrder = createOrder;
;
function getAllOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderRepository = typeorm_1.getRepository(Order_1.Order);
        const orders = yield orderRepository.find({
            relations: ['orderProduct', 'orderProduct.product', 'consumer'],
        });
        res.status(200)
            .send(orders);
    });
}
exports.getAllOrders = getAllOrders;
;
function getOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        console.log(id);
        const orderRepository = typeorm_1.getRepository(Order_1.Order);
        const orders = yield orderRepository.findOne({
            where: {
                id,
            },
            relations: ['orderProduct', 'orderProduct.product', 'consumer'],
        });
        if (!orders) {
            throw new httpErrors_1.HTTP400Error('No such order.');
        }
        res.status(200)
            .send(orders);
    });
}
exports.getOrderById = getOrderById;
;
function getOrderByConsumerId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const orderRepository = typeorm_1.getRepository(Order_1.Order);
        const orders = yield orderRepository.find({
            where: {
                consumer: {
                    id,
                },
            },
            relations: ['orderProduct', 'orderProduct.product', 'consumer'],
        });
        res.status(200)
            .send(orders);
    });
}
exports.getOrderByConsumerId = getOrderByConsumerId;
;
function updateOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const { products } = req.body;
        const orderRepository = typeorm_1.getRepository(Order_1.Order);
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const orderProductRepository = typeorm_1.getRepository(OrderProduct_1.OrderProduct);
    });
}
exports.updateOrder = updateOrder;
//# sourceMappingURL=OrderControllers.js.map