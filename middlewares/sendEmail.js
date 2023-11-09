require("dotenv").config();
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

const { MAILGUN_API } = process.env;

const auth = {
  auth: {
    api_key: MAILGUN_API,
    domain: "sandbox2f587d4cf8704af08797fcf25cacfb68.mailgun.org",
  },
};
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

async function sendEmail(receiver, messageBody) {
  const emailHTML = `<a href="${messageBody}">Follow this link to verify your email</a>`;

  try {
    const mail = await nodemailerMailgun.sendMail({
      from: "node@localhost.com",
      to: receiver,
      subject: "User Verification",
      html: emailHTML,
    });

    // console.log(mail);
  } catch (err) {
    // console.log(err);
  }
}

module.exports = sendEmail;
