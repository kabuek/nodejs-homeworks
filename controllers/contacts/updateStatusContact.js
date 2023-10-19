const Contact = require("../../models/contact");

const updateStatusContact = async (contactId, body) => {
  try {
    const { favorite } = body;
    if (!favorite) return "missing field favorite";
    //   const validationReq = validateUpdate({ name, email, phone });
    //   if (validationReq.error) return validationReq.error.details[0].message;

    const contactData = {
      favorite,
    };
    const updatedContact = await Contact.findByIdAndUpdate(contactId, contactData, { new: true });
    return updatedContact;
  } catch (error) {}
};

module.exports = updateStatusContact;
