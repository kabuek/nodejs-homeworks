const Contact = require("../../models/contact");

const removeContact = async (contactId) => {
  try {
    let removedItem = await Contact.findByIdAndRemove(contactId);
    return removedItem;
  } catch (error) {}
};

module.exports = removeContact;
