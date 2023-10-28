require("dotenv").config();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const { JWT_secret } = process.env;

async function logout(req) {
  let token = req.header("authorization");
  token = token.split(" ");
  const { id } = jwt.verify(token[1], JWT_secret, (err, decoded) => {
    if (err) return { id: null };
    return decoded;
  });
  if (!id) return { code: 401, data: { message: "Not authorized" } };

  const user = await User.findById(id, { password: 0, createdAt: 0, updatedAt: 0 });
  if (!user) return { code: 401, data: { message: "Not authorized" } };

  user.token = undefined;
  await User.findByIdAndUpdate(id, user, { new: true });

  return { code: 204, data: "" };
}

module.exports = logout;
