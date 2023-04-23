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
    incoming: [
        { name: "Salary", color: "#24CCA7" },
        { name: "Other", color: "#00AD84" },
    ],
    spending: [
        { name: "Rest", color: "#24CCA7" },
        { name: "Home", color: "#FED057" },
        { name: "Food", color: "#FFD8D0" },
        { name: "Car", color: "#FD9498" },
        { name: "Children", color: "#6E78E8" },
        { name: "Education", color: "#81E1FF" },
        { name: "Other", color: "#00AD84" },
    ],
};
