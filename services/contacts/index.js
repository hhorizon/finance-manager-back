const Contacts = require("../../repository/contacts");
const { CustomError } = require("../../middlewares");
const { HttpCode } = require("../../libs/constants");

class ContactsService {
  async getAll(query, user) {
    const { page = 1, limit = 20, favorite } = query;

    const result = await Contacts.getAllContacts(
      { page, limit, favorite },
      user
    );

    return result;
  }

  async getById(id, user) {
    const contact = await Contacts.getContactById(id, user);
    if (!contact) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }
    return contact;
  }

  async create(body, user) {
    const contact = await Contacts.addContact(body, user);
    return contact;
  }

  async remove(id, user) {
    const contact = await Contacts.removeContact(id, user);
    if (!contact) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }
    return contact;
  }

  async update(id, body, user) {
    const contact = await Contacts.updateContact(id, body, user);
    if (!contact) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }
    return contact;
  }

  async updateStatus(id, favorite, user) {
    const contact = await Contacts.updateStatusContact(id, favorite, user);
    if (!contact) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }
    return contact;
  }
}

module.exports = new ContactsService();
