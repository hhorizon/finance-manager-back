import jimp from "jimp";
import { IUser } from "../../types";

class AvatarService {
  storage: any;
  pathFile: string;

  // TODO typify req.file
  constructor(Storage: any, file: any, user: IUser) {
    this.storage = new Storage(file, user);
    this.pathFile = file.path;
  }

  async update() {
    await this.transform(this.pathFile);
    const urlOfAvatar = await this.storage.save();
    return urlOfAvatar;
  }

  async transform(pathFile: string) {
    const image = await jimp.read(pathFile);
    await image
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(pathFile);
  }
}

export default AvatarService;
