const contactsService = require("../../services/contacts");
const { HttpCode } = require("../../libs/constants");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { user } = req;
  const contact = await contactsService.getById(contactId, user);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { contact },
  });
};

module.exports = getContactById;
