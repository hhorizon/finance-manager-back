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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeContact = exports.updateFavoriteStatusContact = exports.updateContact = exports.getAllContacts = exports.getContactById = exports.addContact = void 0;
const contact_1 = __importDefault(require("../../models/contact"));
// create contact
const addContact = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_1.default.create(Object.assign(Object.assign({}, body), { owner: user.id }));
    return result;
});
exports.addContact = addContact;
// find contact
const getContactById = (contactId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_1.default.findOne({ _id: contactId, owner: user.id });
    return result;
});
exports.getContactById = getContactById;
const getAllContacts = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = yield contact_1.default.paginate({ owner: user.id }), { docs: contacts, totalDocs: totalContacts } = _a, rest = __rest(_a, ["docs", "totalDocs"]);
    console.log(contacts);
    return Object.assign({ contacts, totalContacts }, rest);
});
exports.getAllContacts = getAllContacts;
// update user
const updateContact = (contactId, body, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_1.default.findOneAndUpdate({
        _id: contactId,
        owner: user.id,
    }, Object.assign({}, body), { new: true });
    return result;
});
exports.updateContact = updateContact;
const updateFavoriteStatusContact = (contactId, favorite, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_1.default.findOneAndUpdate({
        _id: contactId,
        owner: user.id,
    }, { favorite }, { new: true });
    return result;
});
exports.updateFavoriteStatusContact = updateFavoriteStatusContact;
// delete contact
const removeContact = (contactId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_1.default.findOneAndRemove({
        _id: contactId,
        owner: user.id,
    });
    return result;
});
exports.removeContact = removeContact;
