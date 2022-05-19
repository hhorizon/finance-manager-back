const contactsService = require("../../services/contacts");
const { HttpCode } = require("../../libs/constants");

const getAllContacts = async (req, res) => {
  const { query, user } = req;
  const contacts = await contactsService.getAll(query, user);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { ...contacts },
  });
};

module.exports = getAllContacts;
