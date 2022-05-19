const Contact = require("../../models/contact");

const getContactById = async (contactId, user) => {
  const result = await Contact.findOne({ _id: contactId, owner: user.id });

  return result;
};

module.exports = getContactById;
