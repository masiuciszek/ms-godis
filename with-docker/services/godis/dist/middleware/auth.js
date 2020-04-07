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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const httpErrors_1 = require("../utils/httpErrors");
function validateConsumer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        const request = yield node_fetch_1.default('http://authapi:4000/authapi/auth/validateToken', {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        });
        const response = yield request.json();
        if (!response.isValid || response.role !== 'user') {
            throw new httpErrors_1.HTTP400Error('Unauthorized.');
        }
        req.headers.user = response;
        next();
    });
}
exports.validateConsumer = validateConsumer;
;
function validateProducer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        const request = yield node_fetch_1.default('http://authapi:4000/authapi/auth/validateToken', {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        });
        const response = yield request.json();
        if (!response.isValid || response.role !== 'producer') {
            throw new httpErrors_1.HTTP400Error('Unauthorized.');
        }
        req.headers.user = response;
        next();
    });
}
exports.validateProducer = validateProducer;
;
function validateAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        const request = yield node_fetch_1.default('http://authapi:4000/authapi/auth/validateToken', {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        });
        const response = yield request.json();
        if (!response.isValid || response.role !== 'admin') {
            throw new httpErrors_1.HTTP400Error('Unauthorized.');
        }
        req.headers.user = response;
        next();
    });
}
exports.validateAdmin = validateAdmin;
;
//# sourceMappingURL=auth.js.map