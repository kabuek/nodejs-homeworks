const Contact = require("../../models/contact");

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    if (Object.keys(body).length === 0) return "missed fields";
    //   const validationReq = validateUpdate({ name, email, phone });
    //   if (validationReq.error) return validationReq.error.details[0].message;

    const contactData = {
      name,
      email,
      phone,
    };
    const updatedContact = await Contact.findByIdAndUpdate(contactId, contactData, { new: true });
    return updatedContact;
  } catch (error) {}
};

module.exports = updateContact;
