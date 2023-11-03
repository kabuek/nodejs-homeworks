const Contact = require("../../models/contact");

const updateStatusContact = async (contactId, body, user) => {
  try {
    const { favorite } = body;
    if (!favorite) return "missing field favorite";
    //   const validationReq = validateUpdate({ name, email, phone });
    //   if (validationReq.error) return validationReq.error.details[0].message;

    const userId = user.id;
    const contactData = {
      favorite,
    };
    const updatedContact = await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, contactData, { new: true });
    return updatedContact;
  } catch (error) {}
};

module.exports = updateStatusContact;
