"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((element) => {
        return {
            path: element.path,
            message: element.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation error',
        errorMessage: errors,
    };
};
exports.default = handleValidationError;
