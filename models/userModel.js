const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 4,
  },
});

module.exports = mongoose.model("User", userSchema);
