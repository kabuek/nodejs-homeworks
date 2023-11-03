const User = require("../../models/user");
const addUserSchema = require("../../schemas/addUserSchema");
const bcrypt = require("bcrypt");

async function addUser(body) {
  const { email, password } = body;
  const { error } = addUserSchema.validate({ email, password });
  if (error) return { code: 400, data: error.details[0].message };

  const hashedPass = await bcrypt.hash(password, 10);
  const newUserData = {
    email,
    password: hashedPass,
  };

  try {
    const newUser = await User.create(newUserData);
    return { code: 201, data: { user: newUser } };
    // return { code: 201, data: { user: { email: newUser.email, subscription: newUser.subscription } } };
  } catch (error) {
    return { code: 409, data: "Email in use" };
  }
}

module.exports = addUser;
