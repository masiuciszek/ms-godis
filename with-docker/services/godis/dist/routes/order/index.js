"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers = __importStar(require("../../controllers/OrderControllers"));
const auth = __importStar(require("../../middleware/auth"));
exports.default = [
    {
        path: '/godisapi/order',
        method: 'post',
        handler: [
            auth.validateConsumer,
            controllers.createOrder,
        ],
    },
    {
        path: '/godisapi/order',
        method: 'get',
        handler: [
            auth.validateAdmin,
            controllers.getAllOrders,
        ],
    },
    {
        path: '/godisapi/order/:id',
        method: 'get',
        handler: [
            auth.validateAdmin,
            controllers.getOrderById,
        ],
    },
    {
        path: '/godisapi/order/consumer/:id',
        method: 'get',
        handler: [
            auth.validateAdmin,
            controllers.getOrderByConsumerId,
        ],
    },
];
//# sourceMappingURL=index.js.map