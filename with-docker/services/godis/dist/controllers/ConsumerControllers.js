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
const Consumer_1 = require("../entities/Consumer");
const httpErrors_1 = require("../utils/httpErrors");
function findAllConsumers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
        const consumers = yield consumerRepository.find();
        console.log(req.cookies);
        res.status(200)
            .json(consumers);
    });
}
exports.findAllConsumers = findAllConsumers;
;
function findConsumerById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
        const consumer = yield consumerRepository.findOne(id);
        if (!consumer) {
            throw new httpErrors_1.HTTP400Error('No such resource.');
        }
        res.status(200)
            .json(consumer);
    });
}
exports.findConsumerById = findConsumerById;
;
function createConsumer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstName, lastName, adress } = req.body;
        if (!firstName || !lastName || !adress) {
            throw new httpErrors_1.HTTP400Error('Missing paramaters in request body.');
        }
        ;
        const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
        const consumer = {
            firstName,
            lastName,
            adress
        };
        const savedConsumer = yield consumerRepository.save(consumer);
        res.status(200)
            .send({
            message: 'Resource created.',
            consumer: savedConsumer,
        });
    });
}
exports.createConsumer = createConsumer;
;
function updateConsumer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
        const id = Number(req.params.id);
        const consumer = {
            id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            adress: req.body.adress
        };
        const resourceExists = yield consumerRepository.findOne(id);
        if (!resourceExists) {
            throw new httpErrors_1.HTTP400Error('No such resource.');
        }
        ;
        yield consumerRepository.save(consumer);
        res.status(200)
            .send({
            message: 'Resource updated.'
        });
    });
}
exports.updateConsumer = updateConsumer;
;
function deleteConsumer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
        const consumer = yield consumerRepository.findOne(id);
        if (!consumer) {
            throw new httpErrors_1.HTTP400Error('No such resource.');
        }
        yield consumerRepository.remove(consumer);
        res.status(200)
            .send({
            message: 'Resource deleted.'
        });
    });
}
exports.deleteConsumer = deleteConsumer;
;
//# sourceMappingURL=ConsumerControllers.js.map