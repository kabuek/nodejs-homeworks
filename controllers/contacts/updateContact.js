const Contact = require("../../models/contact");

const updateContact = async (contactId, body, user) => {
  try {
    const { name, email, phone } = body;
    if (Object.keys(body).length === 0) return "missed fields";

    const userId = user.id;
    const contactData = {
      name,
      email,
      phone,
    };
    const updatedContact = await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, contactData, { new: true });
    return updatedContact;
  } catch (error) {}
};

module.exports = updateContact;
