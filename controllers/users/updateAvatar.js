const AvatarService = require("../../services/avatar");
const LocalStorage = require("../../services/avatar/local-storage");
const { HttpCode } = require("../../libs/constants");

const updateAvatar = async (req, res) => {
  const avatarService = new AvatarService(LocalStorage, req.file, req.user);

  const urlOfAvatar = await avatarService.update();

  res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { avatarURL: urlOfAvatar },
  });
};

module.exports = updateAvatar;
