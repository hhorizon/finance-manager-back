const Contact = require("../../models/contact");

const addContact = async (body, user) => {
  const result = await Contact.create({ ...body, owner: user.id });

  return result;
};

module.exports = addContact;
