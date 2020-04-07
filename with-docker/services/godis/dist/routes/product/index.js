"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers = __importStar(require("../../controllers/ProductControllers"));
exports.default = [
    {
        path: '/godisapi/product',
        method: 'get',
        handler: [
            controllers.getAllProducts,
        ],
    },
    {
        path: '/godisapi/product/:id',
        method: 'get',
        handler: [
            controllers.getProductById,
        ],
    },
    {
        path: '/godisapi/product/producer/:producer',
        method: 'get',
        handler: [
            controllers.getProductByProducer,
        ],
    },
    {
        path: '/godisapi/product',
        method: 'post',
        handler: [
            controllers.createProduct,
        ],
    },
    {
        path: '/godisapi/product/:id',
        method: 'put',
        handler: [
            controllers.updateProduct,
        ],
    },
    {
        path: '/godisapi/product/:id',
        method: 'delete',
        handler: [
            controllers.deleteProduct,
        ],
    },
];
//# sourceMappingURL=index.js.map