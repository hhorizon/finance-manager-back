import { Request, Response } from "express";
import contactService from "../../services/contact";
import { HttpCode } from "../../libs/constants";

export const addContact = async (req: Request, res: Response) => {
  const { body, user } = req;
  const contact = await contactService.create(body, user);

  return res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, payload: { contact } });
};

export const getContactById = async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const { user } = req;
  const contact = await contactService.getById(contactId, user);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { contact },
  });
};

export const getAllContacts = async (req: Request, res: Response) => {
  const { query, user } = req;
  const contacts = await contactService.getAll(user);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { ...contacts },
  });
};

export const updateContact = async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const { body, user } = req;
  const contact = await contactService.update(contactId, body, user);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { contact },
  });
};

export const updateFavoriteStatusContact = async (
  req: Request,
  res: Response,
) => {
  if (req.body.favorite === undefined) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "missing field favorite",
    });
  }

  if (typeof req.body.favorite !== "boolean") {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "field 'favorite' must be boolean type",
    });
  }

  const { contactId } = req.params;
  const { favorite } = req.body;
  const { user } = req;

  const contact = await contactService.updateFavoriteStatus(
    contactId,
    favorite,
    user,
  );

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { contact },
  });
};

export const removeContact = async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const { user } = req;
  const contact = await contactService.remove(contactId, user);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    message: "contact deleted",
    payload: { contact },
  });
};
