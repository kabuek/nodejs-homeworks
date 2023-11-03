require("dotenv").config();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const { JWT_secret } = process.env;

async function current(req) {
  let token = req.header("authorization");
  token = token.split(" ");
  token = token[1];

  const user = await User.findOne({ token: token }, { _id: 0, email: 1, subscription: 1 });
  if (!user) return { code: 401, data: { message: "Not authorized" } };

  return { code: 200, data: { user: user } };
}

module.exports = current;
