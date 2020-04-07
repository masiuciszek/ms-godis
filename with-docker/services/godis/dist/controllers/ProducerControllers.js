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
const Producer_1 = require("../entities/Producer");
const httpErrors_1 = require("../utils/httpErrors");
function getAllProducers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const producerRepository = typeorm_1.getRepository(Producer_1.Producer);
        const producers = yield producerRepository.find();
        res.status(200)
            .json(producers);
    });
}
exports.getAllProducers = getAllProducers;
;
function getProducerById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const producerRepository = typeorm_1.getRepository(Producer_1.Producer);
        const producer = yield producerRepository.findOne(id);
        if (!producer) {
            throw new httpErrors_1.HTTP400Error('No such resource.');
        }
        ;
        res.status(200)
            .json(producer);
    });
}
exports.getProducerById = getProducerById;
function createProducer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.body;
        if (!name) {
            throw new httpErrors_1.HTTP400Error('Missing paramater in request body.');
        }
        ;
        const producer = {
            name
        };
        const producerRepository = typeorm_1.getRepository(Producer_1.Producer);
        const savedProducer = yield producerRepository.save(producer);
        res.status(200)
            .send({
            message: 'Resource created.',
            producer: savedProducer,
        });
    });
}
exports.createProducer = createProducer;
function updateProducer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.body;
        const id = Number(req.params.id);
        const producerRepository = typeorm_1.getRepository(Producer_1.Producer);
        const resourceExists = yield producerRepository.findOne(id);
        if (!resourceExists) {
            throw new httpErrors_1.HTTP400Error('No such resource.');
        }
        ;
        const producer = {
            id,
            name,
        };
        yield producerRepository.save(producer);
        res.status(200)
            .send({
            message: 'Resource updated.'
        });
    });
}
exports.updateProducer = updateProducer;
function deleteProducer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const producerRepository = typeorm_1.getRepository(Producer_1.Producer);
        const producer = yield producerRepository.findOne(id);
        if (!producer) {
            throw new httpErrors_1.HTTP400Error('No such resource.');
        }
        ;
        yield producerRepository.remove(producer);
        res.status(200)
            .send({
            message: 'Resource deleted.'
        });
    });
}
exports.deleteProducer = deleteProducer;
;
//# sourceMappingURL=ProducerControllers.js.map