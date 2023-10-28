const express = require("express");
const userController = require("../../controllers/users");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const result = await userController.addUser(req.body);
  res.status(result.code).json(result.data);
});

router.post("/login", async (req, res, next) => {
  const result = await userController.login(req.body);
  res.status(result.code).json(result.data);
});

router.post("/logout", async (req, res, next) => {
  const result = await userController.logout(req);
  res.status(result.code).json(result.data);
});

router.post("/current", async (req, res, next) => {
  const result = await userController.current(req);
  res.status(result.code).json(result.data);
});

router.patch("/", async (req, res, next) => {
  const result = await userController.update(req);
  res.status(result.code).json(result.data);
});

module.exports = router;
