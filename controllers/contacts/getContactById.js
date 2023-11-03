const Contact = require("../../models/contact");

const getContactById = async (contactId, user) => {
  const userId = user.id;
  let contactsList = await Contact.findOne({ _id: contactId, owner: userId });
  return contactsList;
};

module.exports = getContactById;
