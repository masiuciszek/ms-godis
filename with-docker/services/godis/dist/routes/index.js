"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const producer_1 = __importDefault(require("./producer"));
const consumer_1 = __importDefault(require("./consumer"));
const product_1 = __importDefault(require("./product"));
const order_1 = __importDefault(require("./order"));
exports.default = [
    ...order_1.default,
    ...product_1.default,
    ...producer_1.default,
    ...consumer_1.default
];
//# sourceMappingURL=index.js.map