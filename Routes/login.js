const express = require("express");
const { AuthenticateUser } = require("../controllers/login");
const client = require("../redis");
var router = express.Router();

client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.log(err);
  });

router.post("/", async (req, res) => {
  try {
    const { email, password } = await req.body;
    var loginCredentaials = await AuthenticateUser(email, password);
    console.log(loginCredentaials);
    if (loginCredentaials === "Invalid User name Or Password") {
      res.status(200).send("Invalid User name Or Password");
    } else if (loginCredentaials === "Server Busy") {
      res.status(200).send("Server Busy");
    } else {
      res.status(200).json({ token: loginCredentaials.token });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
