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
Object.defineProperty(exports, "__esModule", { value: true });
const contacts_1 = require("../../repository/contacts");
const middlewares_1 = require("../../middlewares");
const constants_1 = require("../../libs/constants");
class ContactService {
    create(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield (0, contacts_1.addContact)(body, user);
            return contact;
        });
    }
    getById(contactId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield (0, contacts_1.getContactById)(contactId, user);
            if (!contact) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "Not found");
            }
            return contact;
        });
    }
    getAll(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const contacts = yield (0, contacts_1.getAllContacts)(user);
            return contacts;
        });
    }
    update(contactId, body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield (0, contacts_1.updateContact)(contactId, body, user);
            if (!contact) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "Not found");
            }
            return contact;
        });
    }
    updateFavoriteStatus(contactId, favorite, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield (0, contacts_1.updateFavoriteStatusContact)(contactId, favorite, user);
            if (!contact) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "Not found");
            }
            return contact;
        });
    }
    remove(contactId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield (0, contacts_1.removeContact)(contactId, user);
            if (!contact) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "Not found");
            }
            return contact;
        });
    }
}
exports.default = new ContactService();
