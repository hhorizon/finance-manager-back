"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
};
exports.default = generateColor;
