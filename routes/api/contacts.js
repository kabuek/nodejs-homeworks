const express = require("express");
const contactController = require("../../controllers/contacts");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.use(auth);

router.get("/", async (req, res, next) => {
  const contactsList = await contactController.listContacts(req.user);
  res.status(200).json(contactsList);
});

router.get("/:contactId", async (req, res, next) => {
  const contactObj = await contactController.getContactById(req.params.contactId, req.user);
  if (!contactObj) return res.status(404).json({ message: "Not found" });
  res.status(200).json(contactObj);
});

router.post("/", async (req, res, next) => {
  const newContact = await contactController.addContact(req.query, req.user);
  if (typeof newContact === "string") return res.status(400).json({ message: newContact });
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await contactController.removeContact(req.params.contactId, req.user);
  if (!contact) return res.status(404).json({ message: "Not found" });
  res.status(200).json(contact);
});

router.put("/:contactId", async (req, res, next) => {
  const contact = await contactController.updateContact(req.params.contactId, req.query, req.user);
  if (typeof contact === "string") return res.status(400).json({ message: contact });
  if (!contact) return res.status(404).json({ message: "Not found" });
  res.status(200).json(contact);
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const contact = await contactController.updateStatusContact(req.params.contactId, req.query, req.user);
  if (typeof contact === "string") return res.status(400).json({ message: contact });
  if (!contact) return res.status(404).json({ message: "Not found" });
  res.status(200).json(contact);
});

module.exports = router;
