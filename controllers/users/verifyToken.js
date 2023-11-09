const User = require("../../models/user");

async function verifyToken(token) {
  const user = await User.findOne({ verificationToken: token });
  if (!user) return { code: 404, data: { message: "User not found" } };

  user.verificationToken = null;
  user.verify = true;
  const updatedUser = await User.findByIdAndUpdate(user.id, user, { new: true });
  return { code: 200, data: { message: "Verification successful" } };
}

module.exports = verifyToken;
