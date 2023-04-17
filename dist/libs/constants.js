"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCategories = exports.HttpCode = void 0;
exports.HttpCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
};
exports.defaultCategories = {
    incoming: ["Salary", "Other"],
    spending: ["Rest", "Home", "Food", "Car", "Children", "Education", "Other"],
};
