const Contact = require("../../models/contact");

const addContact = async (body) => {
  const { name, email, phone } = body;

  //   const validationReq = validateAddNew({ name, email, phone });
  //   if (validationReq.error) return validationReq.error.details[0].message;
  const newContact = {
    name: name,
    email: email,
    phone: phone,
  };
  let contacts = await Contact.create(newContact);
  return contacts;
};

module.exports = addContact;
