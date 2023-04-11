import Contact from "../../models/contact";
import { IContact, UserDocument } from "../../types";

// create contact
export const addContact = async (body: IContact, user: UserDocument) => {
  const result = await Contact.create({ ...body, owner: user.id });

  return result;
};

// find contact
export const getContactById = async (contactId: string, user: UserDocument) => {
  const result = await Contact.findOne({ _id: contactId, owner: user.id });

  return result;
};

export const getAllContacts = async (user: UserDocument) => {
  const {
    docs: contacts,
    totalDocs: totalContacts,
    ...rest
  } = await Contact.paginate({ owner: user.id });
  console.log(contacts);

  return { contacts, totalContacts, ...rest };
};

// update user
export const updateContact = async (
  contactId: string,
  body: IContact,
  user: UserDocument,
) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: user.id,
    },
    {
      ...body,
    },
    { new: true },
  );

  return result;
};

export const updateFavoriteStatusContact = async (
  contactId: string,
  favorite: boolean,
  user: UserDocument,
) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: user.id,
    },
    { favorite },
    { new: true },
  );

  return result;
};

// delete contact
export const removeContact = async (contactId: string, user: UserDocument) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: user.id,
  });

  return result;
};
