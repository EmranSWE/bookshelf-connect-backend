"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    const err = error.errors.map(err => {
        return {
            path: err === null || err === void 0 ? void 0 : err.path[err.path.length - 1].toString(),
            message: err === null || err === void 0 ? void 0 : err.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessage: err,
    };
};
exports.default = handleZodError;
