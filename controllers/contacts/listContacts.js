const Contact = require("../../models/contact");

const listContacts = async (query) => {
  const contactsList = await Contact.find(query);
  return contactsList;
};

module.exports = listContacts;
