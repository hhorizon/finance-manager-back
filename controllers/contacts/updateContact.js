const contactsService = require("../../services/contacts");
const { HttpCode } = require("../../libs/constants");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { body, user } = req;
  const contact = await contactsService.update(contactId, body, user);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { contact },
  });
};

module.exports = updateContact;
