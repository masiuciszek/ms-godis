"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers = __importStar(require("../../controllers/ProducerControllers"));
exports.default = [
    {
        path: '/godisapi/producer',
        method: 'get',
        handler: [
            controllers.getAllProducers,
        ],
    },
    {
        path: '/godisapi/producer/:id',
        method: 'get',
        handler: [
            controllers.getProducerById,
        ],
    },
    {
        path: '/godisapi/producer',
        method: 'post',
        handler: [
            controllers.createProducer,
        ],
    },
    {
        path: '/godisapi/producer/:id',
        method: 'put',
        handler: [
            controllers.updateProducer,
        ],
    },
    {
        path: '/godisapi/producer/:id',
        method: 'delete',
        handler: [
            controllers.deleteProducer,
        ],
    },
];
//# sourceMappingURL=index.js.map