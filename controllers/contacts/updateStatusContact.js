const contactsService = require("../../services/contacts");
const { HttpCode } = require("../../libs/constants");

const updateStatusContact = async (req, res) => {
  if (req.body.favorite === undefined) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "missing field favorite",
    });
  }

  const { contactId } = req.params;
  const { favorite } = req.body;
  const { user } = req;
  const contact = await contactsService.updateStatus(contactId, favorite, user);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { contact },
  });
};

module.exports = updateStatusContact;
