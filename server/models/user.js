const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
  },
  contact: {
    type: Number,
    require: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(1).max(50).required(),
    email: Joi.string().max(255).required().email(),
    contact: Joi.number().required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
