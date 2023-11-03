require("dotenv").config();
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const addUserSchema = require("../../schemas/addUserSchema");
const jwt = require("jsonwebtoken");

const { JWT_secret } = process.env;

async function login(body) {
  const { email, password } = body;
  const { error } = addUserSchema.validate({ email, password });
  if (error) return { code: 400, data: error.details[0].message };

  const userData = await User.findOne({ email: email });
  if (!userData) return { code: 401, data: "Email or password is wrong" };

  const compare = await bcrypt.compare(password, userData.password);
  if (!compare) return { code: 401, data: "Email or password is wrong" };

  const token = jwt.sign({ id: userData._id }, JWT_secret, { expiresIn: "1h" });
  userData.token = token;
  await User.findOneAndUpdate({ email: email }, userData, { new: true });
  return {
    code: 200,
    data: {
      token: token,
      user: {
        email: userData.email,
        subscription: userData.subscription,
      },
    },
  };
}

module.exports = login;
