"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const route_1 = __importDefault(require("./app/route"));
//Middleware
app.use((0, cors_1.default)());
//Body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({}));
app.use('/api/v1/', route_1.default);
//Testing
app.get('/', (req, res, next) => {
    res.send('Server is running');
});
app.use(globalErrorHandler_1.default);
exports.default = app;
