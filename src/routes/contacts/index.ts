import express from "express";

import {
  addContact,
  getContactById,
  getAllContacts,
  updateContact,
  updateFavoriteStatusContact,
  removeContact,
} from "../../controllers/contacts";
import { contactSchema } from "../../schemas/contactValidationSchemes";
import { errorWrapper, guard, validateBody } from "../../middlewares";

const router = express.Router();

router.get("/", guard, errorWrapper(getAllContacts));

router.get("/:contactId", guard, errorWrapper(getContactById));

router.post("/", guard, validateBody(contactSchema), errorWrapper(addContact));

router.delete("/:contactId", guard, errorWrapper(removeContact));

router.put(
  "/:contactId",
  guard,
  validateBody(contactSchema),
  errorWrapper(updateContact),
);

router.patch(
  "/:contactId/favorite",
  guard,
  errorWrapper(updateFavoriteStatusContact),
);

export default router;
