const contactsService = require("../../services/contacts");
const { HttpCode } = require("../../libs/constants");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { user } = req;
  const contact = await contactsService.remove(contactId, user);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    message: "contact deleted",
    payload: { contact },
  });
};

module.exports = removeContact;
