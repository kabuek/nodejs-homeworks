const fs = require("fs/promises");
const path = require("path");
const uniqid = require("uniqid");
const { addNew, update } = require(path.join(__dirname, "../schema.js"));
const validateAddNew = ({ name, email, phone }) => {
  return addNew.validate({ name: name, email: email, phone: phone });
};
const validateUpdate = ({ name, email, phone }) => {
  return update.validate({ name: name, email: email, phone: phone });
};

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contactsList);
};

const getContactById = async (contactId) => {
  let contactsList = await fs.readFile(contactsPath, "utf-8");
  contactsList = JSON.parse(contactsList);
  return contactsList.find((item) => item.id === contactId);
};

const removeContact = async (contactId) => {
  let contactsList = await fs.readFile(contactsPath, "utf-8");
  contactsList = JSON.parse(contactsList);
  const contactIndex = contactsList.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) return contactIndex;
  contactsList.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactIndex;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  if (validateAddNew({ name, email, phone }).error) return validateAddNew({ name, email, phone }).error.details[0].message;
  const newContact = {
    id: uniqid(),
    name: name,
    email: email,
    phone: phone,
  };
  let contactsList = await fs.readFile(contactsPath, "utf-8");
  contactsList = JSON.parse(contactsList);
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  if (Object.keys(body).length === 0) return "missed fields";
  if (validateUpdate({ name, email, phone }).error) return validateUpdate({ name, email, phone }).error.details[0].message;

  let contactsList = await fs.readFile(contactsPath, "utf-8");
  contactsList = JSON.parse(contactsList);
  const contactIndex = contactsList.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) return contactIndex;

  const updatedContact = {
    id: contactsList[contactIndex].id,
    name: name || contactsList[contactIndex].name,
    email: email || contactsList[contactIndex].email,
    phone: phone || contactsList[contactIndex].phone,
  };
  contactsList[contactIndex] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
