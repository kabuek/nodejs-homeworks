const addUser = require("./addUser");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const update = require("./update");
const updateAvatar = require("./updateAvatar");
const verifyToken = require("./verifyToken");
const resendVerification = require("./resendVerification");

module.exports = { addUser, login, logout, current, update, updateAvatar, verifyToken, resendVerification };
