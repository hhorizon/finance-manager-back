const Contact = require("../../models/contact");

const updateStatusContact = async (contactId, favorite, user) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: user.id,
    },
    { favorite },
    { new: true }
  );

  return result;
};

module.exports = updateStatusContact;
