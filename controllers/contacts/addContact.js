const contactsService = require("../../services/contacts");
const { HttpCode } = require("../../libs/constants");

const addContact = async (req, res) => {
  const { body, user } = req;
  const contact = await contactsService.create(body, user);

  return res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, payload: { contact } });
};

module.exports = addContact;
