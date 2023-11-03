const Contact = require("../../models/contact");

const listContacts = async (user) => {
  const userId = user.id;
  const contactsList = await Contact.find({ owner: userId });
  return contactsList;
};

module.exports = listContacts;
