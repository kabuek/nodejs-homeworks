const express = require("express");
const path = require("path");
const { listContacts, getContactById, removeContact, addContact, updateContact } = require(path.join(
  __dirname,
  "../../models/contacts.js"
));

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactsList = await listContacts();
  res.status(200).json(contactsList);
});

router.get("/:contactId", async (req, res, next) => {
  const contactObj = await getContactById(req.params.contactId);
  if (contactObj === undefined) return res.status(404).json({ message: "Not found" });
  res.status(200).json(contactObj);
});

router.post("/", async (req, res, next) => {
  const newContact = await addContact(req.query);
  if (typeof newContact === "string") return res.status(400).json({ message: newContact });
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contactIndex = await removeContact(req.params.contactId);
  if (contactIndex === -1) return res.status(404).json({ message: "Not found" });
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.query);
  if (typeof contact === "string") return res.status(400).json({ message: contact });
  if (contact === -1) return res.status(404).json({ message: "Not found" });
  res.status(200).json(contact);
});

module.exports = router;
