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
const Consumer_1 = require("../../entities/Consumer");
const httpErrors_1 = require("../../utils/httpErrors");
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
        yield consumerRepository.save(consumer)
            .then(() => {
            res.status(200)
                .send({ message: 'Resource created.' });
        })
            .catch(err => {
            throw err;
        });
    });
}
exports.default = createConsumer;
;
//# sourceMappingURL=CreateConsumer.js.map