const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.Nodemailer_User,
    pass: process.env.Nodemailer_Pass,
  },
});

function sendMail(toEmail, subject, content) {
  const mailOptions = {
    from: "dhinakaran75493@gmail.com",
    to: toEmail,
    subject: subject,
    html: content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Error occurred while sending email ${error}`);
    } else {
      console.log("Email Sent", info.response);
    }
  });
}

module.exports = { sendMail };
