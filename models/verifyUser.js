const mongoose = require("mongoose");

const verifySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      require: true,
    },
  },
  {
    collection: "verifyUser",
  }
);

module.exports = mongoose.model("verifyUser", verifySchema);
