const Contact = require("../../models/contact");

const addContact = async (body, user) => {
  const { name, email, phone } = body;
  const userId = user.id;
  //   const validationReq = validateAddNew({ name, email, phone });
  //   if (validationReq.error) return validationReq.error.details[0].message;
  const newContact = {
    name: name,
    email: email,
    phone: phone,
    owner: userId,
  };
  let contacts = await Contact.create(newContact);
  return contacts;
};

module.exports = addContact;
