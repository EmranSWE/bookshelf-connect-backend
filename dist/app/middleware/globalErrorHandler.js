"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../../config"));
const handleValidation_1 = __importDefault(require("../../errors/handleValidation"));
const apiErrors_1 = __importDefault(require("../../errors/apiErrors"));
const handledZodError_1 = __importDefault(require("../../errors/handledZodError"));
const handledCastError_1 = __importDefault(require("../../errors/handledCastError"));
process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
});
const globalErrorHandler = (error, req, res, next) => {
    config_1.default.env === 'development'
        ? console.log('Error found before save date,See logger--->')
        : console.log('Global error', error);
    let statusCode = 400;
    let message = 'Something went wrong!';
    let errorMessage = [];
    if (error.name === 'ValidationError') {
        const simplifiedError = (0, handleValidation_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error.message,
                },
            ]
            : [];
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handledZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = (0, handledCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof apiErrors_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessage = error.message
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
