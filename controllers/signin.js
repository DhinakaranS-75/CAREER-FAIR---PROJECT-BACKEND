const User = require("../models/User");
const { sendMail } = require("./SendMail");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const verifyUser = require("../models/verifyUser");
dotenv.config();
async function InsertVerifyUser(name, email, password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = generateToken(email);

    const newUser = new verifyUser({
      name: name,
      email: email,
      password: hashedPassword,
      token: token,
    });

    const activtionLink = `http://localhost:4000/signin/${token}`;
    const content = `<h4>Hi ,There </h4>
    <h5>Welcome To The App</h5>
    <p>Thank You For Signing Up.Click on the below link to activate</p>
    <a href="${activtionLink}"> Click Here</a>
    <p>Regards</p>
    <p>Recipe_Book</p>`;

    await newUser.save();
    sendMail(email, "VerifyUser", content);
  } catch (err) {
    console.log(err);
  }
}

function generateToken(email) {
  const token = jwt.sign(email, process.env.Secret_key);
  return token;
}

async function InsertSignUpUser(token) {
  try {
    const userVerify = await verifyUser.findOne({ token: token });
    if (userVerify) {
      const newUser = new User({
        name: userVerify.name,
        email: userVerify.email,
        password: userVerify.password,
        forgotPassword: {},
      });
      await newUser.save();
      await userVerify.deleteOne({ token: token });
      const content = `
      <h4>Hi ,Registeration Successful</h4>
      <h5>Welcome To The App</h5>
      <p>You are Successfully registerd</p>
      <p>Regards</p>
      <p>Recipe_Book</p>`;
      sendMail(newUser.email, "Registeration Sucessful", content);
      return `<h4>Hi ,There </h4>
    <h5>Welcome To The App</h5>
    <p>You are Successfully registerd</p>
    <p>Regards</p>
    <p>Recipe_Book</p>`;
    }
    return `<h4> Registeration failed</h4>  
  <p>Link expired...........</p>
  <p>Regards</p>
  <p>Recipe_Book</p>`;
  } catch (err) {
    console.log(err);
    return `<html>
    <body>
    <h4> Registeration failed</h4>  
    <p>Unexpected error happenned......</p>
    <p>Regards</p>
    <p>Recipe_Book</p>
    </body>
    </html>`;
  }
}

module.exports = { InsertVerifyUser, InsertSignUpUser };
