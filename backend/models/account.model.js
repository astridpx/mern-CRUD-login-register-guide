const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// const schema = mongoose.Schema;

// Schema for database
const accountSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

// supply the name of collection in the mongoDB and the schema
const Account = mongoose.model("users", accountSchema);

// validation
const validate = (data) => {
  const schema = Joi.object({
    fullname: Joi.string().required().label("Full Name"),
    username: Joi.string().min(4).max(20).required().label("Username"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { Account, validate };
