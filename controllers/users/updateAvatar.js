require("dotenv").config();
const User = require("../../models/user");
const updateUserSchema = require("../../schemas/updateUserSchema");
const jwt = require("jsonwebtoken");
const Jimp = require("jimp");

const { JWT_secret } = process.env;

async function updateAvatar(req) {
  let token = req.header("authorization");
  token = token.split(" ");
  const { id } = jwt.verify(token[1], JWT_secret, (err, decoded) => {
    if (err) return { id: null };
    return decoded;
  });
  if (!id) return { code: 401, data: { message: "Not authorized" } };

  const user = await User.findById(id, { password: 0, createdAt: 0, updatedAt: 0 });
  if (!user) return { code: 401, data: { message: "Not authorized" } };

  const { path, filename } = req.file;
  await Jimp.read(path).then((lenna) => {
    return lenna.resize(250, 250).write("./public/avatars/" + filename);
  });
  const newAvatarPath = "http://localhost:3000/avatars/" + filename;
  user.avatarURL = newAvatarPath;
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

  return { code: 200, data: { avatarURL: newAvatarPath } };
}

module.exports = updateAvatar;
