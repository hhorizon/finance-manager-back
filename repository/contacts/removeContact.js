const Contact = require("../../models/contact");

const removeContact = async (contactId, user) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: user.id,
  });

  return result;
};

module.exports = removeContact;
