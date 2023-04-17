"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contacts_1 = require("../../controllers/contacts");
const contactValidationSchemes_1 = require("../../schemas/contactValidationSchemes");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
router.get("/", middlewares_1.guard, (0, middlewares_1.errorWrapper)(contacts_1.getAllContacts));
router.get("/:contactId", middlewares_1.guard, (0, middlewares_1.errorWrapper)(contacts_1.getContactById));
router.post("/", middlewares_1.guard, (0, middlewares_1.validateBody)(contactValidationSchemes_1.contactSchema), (0, middlewares_1.errorWrapper)(contacts_1.addContact));
router.delete("/:contactId", middlewares_1.guard, (0, middlewares_1.errorWrapper)(contacts_1.removeContact));
router.put("/:contactId", middlewares_1.guard, (0, middlewares_1.validateBody)(contactValidationSchemes_1.contactSchema), (0, middlewares_1.errorWrapper)(contacts_1.updateContact));
router.patch("/:contactId/favorite", middlewares_1.guard, (0, middlewares_1.errorWrapper)(contacts_1.updateFavoriteStatusContact));
exports.default = router;
