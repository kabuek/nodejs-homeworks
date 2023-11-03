require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { JWT_secret } = process.env;

async function auth(req, res, next) {
  let token = req.header("authorization");
  if (!token) return res.status(401).json({ message: "Not authorized" });

  token = token.split(" ");
  if (token[0] !== "Bearer") return res.status(401).json({ message: "Not authorized" });

  const { id } = jwt.verify(token[1], JWT_secret, (err, decoded) => {
    if (err) return { id: null };
    return decoded;
  });
  if (!id) return res.status(401).json({ message: "Not authorized" });

  req.user = await User.findById(id, { password: 0, createdAt: 0, updatedAt: 0 });
  next();
}

module.exports = auth;
