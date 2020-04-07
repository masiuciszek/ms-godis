"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers = __importStar(require("../../controllers/ConsumerControllers"));
exports.default = [
    {
        path: '/godisapi/consumer',
        method: 'post',
        handler: [
            controllers.createConsumer,
        ],
    },
    {
        path: '/godisapi/consumer',
        method: 'get',
        handler: [
            controllers.findAllConsumers,
        ],
    },
    {
        path: '/godisapi/consumer/:id',
        method: 'get',
        handler: [
            controllers.findConsumerById,
        ],
    },
    {
        path: '/godisapi/consumer/:id',
        method: 'put',
        handler: [
            controllers.updateConsumer,
        ],
    },
    {
        path: '/godisapi/consumer/:id',
        method: 'delete',
        handler: [
            controllers.deleteConsumer,
        ],
    },
];
//# sourceMappingURL=index.js.map