import path from "path";
import fs from "fs/promises";
import { updateUserAvatar } from "../../repository/users";
import { UserDocument } from "../../types";

class LocalStorage {
  file: any;
  user: UserDocument;
  static: string;

  constructor(file: any, user: UserDocument) {
    this.file = file;
    this.user = user;
    this.static = process.env.STATIC_FOLDER || "";
  }

  async save() {
    const destination = path.join(this.static, "avatars", String(this.user.id));

    await fs.mkdir(destination, { recursive: true });

    await fs.rename(this.file.path, path.join(destination, this.file.filename));

    const urlOfAvatar = path.normalize(
      path.join("/avatars", String(this.user.id), this.file.filename),
    );

    await updateUserAvatar(this.user.id, urlOfAvatar);

    return urlOfAvatar;
  }
}

export default LocalStorage;
