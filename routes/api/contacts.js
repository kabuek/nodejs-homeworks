const express = require("express");
const contactController = require("../../controllers/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactsList = await contactController.listContacts();
  res.status(200).json(contactsList);
});

router.get("/:contactId", async (req, res, next) => {
  const contactObj = await contactController.getContactById(req.params.contactId);
  if (contactObj === undefined) return res.status(404).json({ message: "Not found" });
  res.status(200).json(contactObj);
});

router.post("/", async (req, res, next) => {
  const newContact = await contactController.addContact(req.query);
  if (typeof newContact === "string") return res.status(400).json({ message: newContact });
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await contactController.removeContact(req.params.contactId);
  console.log(contact);
  if (contact === undefined) return res.status(404).json({ message: "Not found" });
  res.status(200).json(contact);
});

router.put("/:contactId", async (req, res, next) => {
  const contact = await contactController.updateContact(req.params.contactId, req.query);
  if (typeof contact === "string") return res.status(400).json({ message: contact });
  if (contact === undefined) return res.status(404).json({ message: "Not found" });
  res.status(200).json(contact);
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const contact = await contactController.updateStatusContact(req.params.contactId, req.query);
  if (typeof contact === "string") return res.status(400).json({ message: contact });
  if (contact === undefined) return res.status(404).json({ message: "Not found" });
  res.status(200).json(contact);
});

module.exports = router;
