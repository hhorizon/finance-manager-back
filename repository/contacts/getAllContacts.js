const Contact = require("../../models/contact");

const getAllContacts = async ({ page, limit, favorite }, user) => {
  if (favorite) {
    const {
      docs: contacts,
      totalDocs: totalContacts,
      ...rest
    } = await Contact.paginate(
      { owner: user.id, favorite: true },
      { page, limit }
    );
    return { contacts, totalContacts, ...rest };
  }

  const {
    docs: contacts,
    totalDocs: totalContacts,
    ...rest
  } = await Contact.paginate({ owner: user.id }, { page, limit });
  return { contacts, totalContacts, ...rest };
};

module.exports = getAllContacts;
