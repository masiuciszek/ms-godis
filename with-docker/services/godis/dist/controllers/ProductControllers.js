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
const Producer_1 = require("../entities/Producer");
const httpErrors_1 = require("../utils/httpErrors");
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const products = yield productRepository.find({ relations: ['producer'] });
        res.status(200).json(products);
    });
}
exports.getAllProducts = getAllProducts;
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const product = yield productRepository.findOne({
            where: {
                id,
            },
            relations: ['producer'],
        });
        if (!product) {
            throw new httpErrors_1.HTTP400Error('No such product.');
        }
        res.status(200).json(product);
    });
}
exports.getProductById = getProductById;
function getProductByProducer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { producer } = req.params;
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const producerRepository = typeorm_1.getRepository(Producer_1.Producer);
        const producerId = yield producerRepository.findOne({
            where: { name: producer },
        });
        if (!producerId) {
            throw new httpErrors_1.HTTP400Error('No such producer.');
        }
        const products = yield productRepository.find({
            relations: ['producer'],
            where: {
                producer: { id: producerId.id },
            },
        });
        res.status(200).json(products);
    });
}
exports.getProductByProducer = getProductByProducer;
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, producerName, qty, price } = req.body;
        if (!name || !producerName) {
            throw new httpErrors_1.HTTP400Error('Missing paramaters in request body.');
        }
        const producerRepository = typeorm_1.getRepository(Producer_1.Producer);
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const producer = yield producerRepository.findOne({
            where: {
                name: producerName,
            },
        });
        if (!producer) {
            throw new httpErrors_1.HTTP400Error('No such producer.');
        }
        const savedProduct = yield productRepository.save({
            name,
            producer,
            qty,
            price
        });
        res.status(200).send({
            message: 'Resource created',
            product: savedProduct,
        });
    });
}
exports.createProduct = createProduct;
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, qty, price } = req.body;
        const id = Number(req.params.id);
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const product = yield productRepository.findOne(id);
        if (!product) {
            throw new httpErrors_1.HTTP400Error('No such product.');
        }
        const resource = yield productRepository.save({
            id,
            name,
            qty,
            price,
        });
        res.status(200).send({
            message: 'Resource updated',
            resource,
        });
    });
}
exports.updateProduct = updateProduct;
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const product = yield productRepository.findOne(id);
        if (!product) {
            throw new httpErrors_1.HTTP400Error('No such product.');
        }
        const resource = yield productRepository.remove(product);
        res.status(200).send({
            message: 'Resource deleted.',
            resource,
        });
    });
}
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=ProductControllers.js.map