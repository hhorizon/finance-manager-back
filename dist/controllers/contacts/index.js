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
exports.removeContact = exports.updateFavoriteStatusContact = exports.updateContact = exports.getAllContacts = exports.getContactById = exports.addContact = void 0;
const contact_1 = __importDefault(require("../../services/contact"));
const constants_1 = require("../../libs/constants");
const addContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, user } = req;
    const contact = yield contact_1.default.create(body, user);
    return res
        .status(constants_1.HttpCode.CREATED)
        .json({ status: "success", code: constants_1.HttpCode.CREATED, payload: { contact } });
});
exports.addContact = addContact;
const getContactById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    const { user } = req;
    const contact = yield contact_1.default.getById(contactId, user);
    return res.json({
        status: "success",
        code: constants_1.HttpCode.OK,
        payload: { contact },
    });
});
exports.getContactById = getContactById;
const getAllContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, user } = req;
    const contacts = yield contact_1.default.getAll(user);
    return res.json({
        status: "success",
        code: constants_1.HttpCode.OK,
        payload: Object.assign({}, contacts),
    });
});
exports.getAllContacts = getAllContacts;
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    const { body, user } = req;
    const contact = yield contact_1.default.update(contactId, body, user);
    return res.json({
        status: "success",
        code: constants_1.HttpCode.OK,
        payload: { contact },
    });
});
exports.updateContact = updateContact;
const updateFavoriteStatusContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.favorite === undefined) {
        return res.status(constants_1.HttpCode.BAD_REQUEST).json({
            status: "error",
            code: constants_1.HttpCode.BAD_REQUEST,
            message: "missing field favorite",
        });
    }
    if (typeof req.body.favorite !== "boolean") {
        return res.status(constants_1.HttpCode.BAD_REQUEST).json({
            status: "error",
            code: constants_1.HttpCode.BAD_REQUEST,
            message: "field 'favorite' must be boolean type",
        });
    }
    const { contactId } = req.params;
    const { favorite } = req.body;
    const { user } = req;
    const contact = yield contact_1.default.updateFavoriteStatus(contactId, favorite, user);
    return res.json({
        status: "success",
        code: constants_1.HttpCode.OK,
        payload: { contact },
    });
});
exports.updateFavoriteStatusContact = updateFavoriteStatusContact;
const removeContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    const { user } = req;
    const contact = yield contact_1.default.remove(contactId, user);
    return res.json({
        status: "success",
        code: constants_1.HttpCode.OK,
        message: "contact deleted",
        payload: { contact },
    });
});
exports.removeContact = removeContact;
