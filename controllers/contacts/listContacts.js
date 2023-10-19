const Contact = require("../../models/contact");

const listContacts = async () => {
  const contactsList = await Contact.find({});
  console.log(contactsList);
  return contactsList;
};

module.exports = listContacts;
