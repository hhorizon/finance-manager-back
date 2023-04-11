import {
  addContact,
  getContactById,
  getAllContacts,
  updateContact,
  updateFavoriteStatusContact,
  removeContact,
} from "../../repository/contacts";
import { CustomError } from "../../middlewares";
import { HttpCode } from "../../libs/constants";
import { IContact, UserDocument } from "../../types";

class ContactService {
  async create(body: IContact, user: UserDocument) {
    const contact = await addContact(body, user);
    return contact;
  }

  async getById(contactId: string, user: UserDocument) {
    const contact = await getContactById(contactId, user);
    if (!contact) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }
    return contact;
  }

  async getAll(user: UserDocument) {
    const contacts = await getAllContacts(user);

    return contacts;
  }

  async update(contactId: string, body: IContact, user: UserDocument) {
    const contact = await updateContact(contactId, body, user);
    if (!contact) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }
    return contact;
  }

  async updateFavoriteStatus(
    contactId: string,
    favorite: boolean,
    user: UserDocument,
  ) {
    const contact = await updateFavoriteStatusContact(
      contactId,
      favorite,
      user,
    );
    if (!contact) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }
    return contact;
  }

  async remove(contactId: string, user: UserDocument) {
    const contact = await removeContact(contactId, user);
    if (!contact) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }
    return contact;
  }
}

export default new ContactService();
