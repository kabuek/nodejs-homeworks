const User = require("../../models/user");
const sendEmail = require("../../middlewares/sendEmail");

async function verifyToken(body) {
  const { email } = body;
  if (!email) return { code: 404, data: { message: "missing required field email" } };

  const user = await User.findOne({ email: email });
  if (!user) return { code: 404, data: { message: "User not found" } };
  if (user.verify) return { code: 400, data: { message: "Verification has already been passed" } };

  const verificationLink = `http://localhost:3000/api/users/verify/${user.verificationToken}`;
  await sendEmail(email, verificationLink);
  return { code: 200, data: { message: "Verification email sent" } };
}

module.exports = verifyToken;
