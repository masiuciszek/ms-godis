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
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const utils_1 = require("./utils");
const middleware_1 = __importDefault(require("./middleware"));
const routes_1 = __importDefault(require("./routes"));
const errorHandlers_1 = __importDefault(require("./middleware/errorHandlers"));
typeorm_1.createConnection()
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    process.on('uncaughtException', error => {
        console.log(error);
        process.exit(1);
    });
    process.on('unhandledRejection', error => {
        console.log(error);
        process.exit(1);
    });
    const app = express_1.default();
    utils_1.applyMiddleware(middleware_1.default, app);
    utils_1.applyRoutes(routes_1.default, app);
    utils_1.applyMiddleware(errorHandlers_1.default, app);
    app.listen(5000, () => console.log('Godisapi listening on port 5000'));
}))
    .catch(error => {
    console.log('TypeORM connection error: ', error);
});
//# sourceMappingURL=index.js.map