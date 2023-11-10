const User = require("../../models/user");
const addUserSchema = require("../../schemas/addUserSchema");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const uniqid = require("uniqid");
const sendEmail = require("../../middlewares/sendEmail");

async function addUser(body) {
  const { email, password } = body;
  const { error } = addUserSchema.validate({ email, password });
  if (error) return { code: 400, data: error.details[0].message };

  const hashedPass = await bcrypt.hash(password, 10);
  const userAvatar = gravatar.url(email, { protocol: "https", s: "100" });
  const verifyToken = uniqid();
  const newUserData = {
    email,
    password: hashedPass,
    avatarURL: userAvatar,
    verificationToken: verifyToken,
  };

  try {
    const newUser = await User.create(newUserData);

    const verificationLink = `http://localhost:3000/api/users/verify/${verifyToken}`;
    await sendEmail(email, verificationLink);
    return { code: 201, data: { user: newUser } };
    // return { code: 201, data: { user: { email: newUser.email, subscription: newUser.subscription } } };
  } catch (error) {
    return { code: 409, data: "Email in use" };
  }
}

module.exports = addUser;
