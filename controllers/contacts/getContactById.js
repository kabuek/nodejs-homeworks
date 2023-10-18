const Contact = require("../../models/contact");

const getContactById = async (contactId) => {
  let contactsList = await Contact.findById(contactId);
  return contactsList;
};

module.exports = getContactById;
