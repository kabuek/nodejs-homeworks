const Contact = require("../../models/contact");

const removeContact = async (contactId, user) => {
  try {
    const userId = user.id;
    let removedItem = await Contact.findOneAndRemove({ _id: contactId, owner: userId });
    return removedItem;
  } catch (error) {}
};

module.exports = removeContact;
